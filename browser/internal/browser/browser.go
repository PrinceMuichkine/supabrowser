package browser

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path"
	"sync"
	"time"

	"github.com/go-rod/rod"
	"github.com/go-rod/rod/lib/launcher"
	"github.com/go-rod/rod/lib/launcher/flags"
	"github.com/go-rod/rod/lib/proto"
	"go.uber.org/zap"
)

// Browser represents a browser instance with enhanced capabilities
type Browser struct {
	config *Config
	logger *zap.Logger
	mu     sync.RWMutex

	browser  *rod.Browser
	launcher *launcher.Launcher
}

// New creates a new Browser instance
func New(config *Config, logger *zap.Logger) *Browser {
	if config == nil {
		config = NewDefaultConfig()
	}
	if logger == nil {
		logger = zap.NewNop()
	}
	return &Browser{
		config: config,
		logger: logger,
	}
}

// Connect initializes and connects to the browser
func (b *Browser) Connect(_ context.Context) error {
	b.mu.Lock()
	defer b.mu.Unlock()

	if b.browser != nil {
		return nil // Already connected
	}

	var err error
	switch {
	case b.config.CdpURL != nil:
		err = b.connectCDP()
	case b.config.WssURL != nil:
		err = b.connectWSS()
	case b.config.ChromeInstancePath != nil:
		err = b.connectExistingChrome()
	default:
		err = b.launchNewBrowser()
	}

	if err != nil {
		return fmt.Errorf("failed to connect browser: %w", err)
	}

	return nil
}

func (b *Browser) launchNewBrowser() error {
	// Create new launcher
	b.launcher = launcher.New()
	
	// Configure launcher with default arguments
	defaultArgs := []string{
		"--no-sandbox",
		"--disable-blink-features=AutomationControlled",
		"--disable-infobars",
		"--disable-background-timer-throttling",
		"--disable-popup-blocking",
		"--disable-backgrounding-occluded-windows",
		"--disable-renderer-backgrounding",
		"--disable-window-activation",
		"--disable-focus-on-load",
		"--no-first-run",
		"--no-default-browser-check",
		"--no-startup-window",
		"--window-position=0,0",
	}

	if b.config.DisableSecurity {
		defaultArgs = append(defaultArgs,
			"--disable-web-security",
			"--disable-site-isolation-trials",
			"--disable-features=IsolateOrigins,site-per-process",
		)
	}

	// Add extra arguments
	if len(b.config.ExtraChromiumArgs) > 0 {
		for _, arg := range b.config.ExtraChromiumArgs {
			if arg != "" {
				defaultArgs = append(defaultArgs, "--"+arg)
			}
		}
	}

	// Set all arguments at once
	for _, arg := range defaultArgs {
		b.launcher = b.launcher.Append(flags.Flag(arg))
	}

	if b.config.Headless {
		b.launcher.Headless(true)
	}

	if b.config.ProxySettings != nil {
		b.launcher.Proxy(b.config.ProxySettings.Server)
	}

	url, err := b.launcher.Launch()
	if err != nil {
		return fmt.Errorf("failed to launch browser: %w", err)
	}

	b.browser = rod.New().ControlURL(url)
	return b.browser.Connect()
}

func (b *Browser) connectCDP() error {
	if b.config.CdpURL == nil {
		return fmt.Errorf("CDP URL is required")
	}
	b.browser = rod.New().ControlURL(*b.config.CdpURL)
	return b.browser.Connect()
}

func (b *Browser) connectWSS() error {
	if b.config.WssURL == nil {
		return fmt.Errorf("WSS URL is required")
	}
	b.browser = rod.New().ControlURL(*b.config.WssURL)
	return b.browser.Connect()
}

func (b *Browser) connectExistingChrome() error {
	if b.config.ChromeInstancePath == nil {
		return fmt.Errorf("Chrome instance path is required")
	}

	// Try connecting to existing debug port
	b.browser = rod.New().ControlURL("http://localhost:9222")
	if err := b.browser.Connect(); err == nil {
		b.logger.Info("Connected to existing Chrome instance")
		return nil
	}

	// Launch new Chrome instance in debug mode
	cmd := exec.CommandContext(context.Background(), *b.config.ChromeInstancePath, "--remote-debugging-port=9222")
	if err := cmd.Start(); err != nil {
		return fmt.Errorf("failed to start Chrome: %w", err)
	}

	b.browser = rod.New().ControlURL("http://localhost:9222")
	return b.browser.Connect()
}

// NewContext creates a new browser context
func (b *Browser) NewContext(ctx context.Context) (*rod.Browser, error) {
	b.mu.RLock()
	defer b.mu.RUnlock()

	if b.browser == nil {
		return nil, fmt.Errorf("browser not connected")
	}

	// Create a new browser context
	return b.browser.MustIncognito(), nil
}

// Close closes the browser instance and cleans up resources
func (b *Browser) Close() error {
	b.mu.Lock()
	defer b.mu.Unlock()

	if b.browser != nil {
		if err := b.browser.Close(); err != nil {
			return fmt.Errorf("failed to close browser: %w", err)
		}
		b.browser = nil
	}

	if b.launcher != nil {
		b.launcher.Cleanup() // Cleanup doesn't return an error
		b.launcher = nil
	}

	return nil
}

// TabInfo represents information about a browser tab
type TabInfo struct {
	PageID int    `json:"page_id"`
	URL    string `json:"url"`
	Title  string `json:"title"`
}

// BrowserState represents the current state of the browser
type BrowserState struct {
	URL            string    `json:"url"`
	Title          string    `json:"title"`
	Tabs           []TabInfo `json:"tabs"`
	Screenshot     *string   `json:"screenshot,omitempty"`
	PixelsAbove    int       `json:"pixels_above"`
	PixelsBelow    int       `json:"pixels_below"`
	BrowserErrors  []string  `json:"browser_errors"`
	currentContext *rod.Browser
}

// GetState returns the current state of the browser
func (b *Browser) GetState(ctx context.Context) (*BrowserState, error) {
	b.mu.RLock()
	defer b.mu.RUnlock()

	if b.browser == nil {
		return nil, fmt.Errorf("browser not connected")
	}

	state := &BrowserState{
		BrowserErrors: make([]string, 0),
	}

	// Get current page
	pages := b.browser.MustPages()
	if len(pages) == 0 {
		return nil, fmt.Errorf("no pages available")
	}

	currentPage := pages[0]
	state.URL = currentPage.MustInfo().URL
	state.Title = currentPage.MustInfo().Title

	// Get tabs information
	state.Tabs = make([]TabInfo, len(pages))
	for i, page := range pages {
		info := page.MustInfo()
		state.Tabs[i] = TabInfo{
			PageID: i,
			URL:    info.URL,
			Title:  info.Title,
		}
	}

	return state, nil
}

// NewTab creates a new tab and optionally navigates to a URL
func (b *Browser) NewTab(ctx context.Context, url *string) error {
	b.mu.Lock()
	defer b.mu.Unlock()

	if b.browser == nil {
		return fmt.Errorf("browser not connected")
	}

	page := b.browser.MustPage()
	if url != nil {
		if err := page.Navigate(*url); err != nil {
			return fmt.Errorf("failed to navigate to URL: %w", err)
		}
	}

	return nil
}

// SwitchTab switches to a specific tab by its page ID
func (b *Browser) SwitchTab(ctx context.Context, pageID int) error {
	b.mu.Lock()
	defer b.mu.Unlock()

	if b.browser == nil {
		return fmt.Errorf("browser not connected")
	}

	pages := b.browser.MustPages()
	if pageID < 0 || pageID >= len(pages) {
		return fmt.Errorf("invalid page ID: %d", pageID)
	}

	page := pages[pageID]
	if _, err := page.Activate(); err != nil {
		return fmt.Errorf("failed to switch to tab: %w", err)
	}

	return nil
}

// CloseTab closes a specific tab by its page ID
func (b *Browser) CloseTab(ctx context.Context, pageID int) error {
	b.mu.Lock()
	defer b.mu.Unlock()

	if b.browser == nil {
		return fmt.Errorf("browser not connected")
	}

	pages := b.browser.MustPages()
	if pageID < 0 || pageID >= len(pages) {
		return fmt.Errorf("invalid page ID: %d", pageID)
	}

	page := pages[pageID]
	if err := page.Close(); err != nil {
		return fmt.Errorf("failed to close tab: %w", err)
	}

	return nil
}

// waitForNetworkIdle waits for the network to be idle
func (b *Browser) waitForNetworkIdle(ctx context.Context, page *rod.Page) error {
	// Create channels for request tracking
	requestStarted := make(chan bool, 100)
	requestEnded := make(chan bool, 100)
	
	// Track active requests
	activeRequests := 0
	
	// Setup request/response listeners
	page.MustEval(`() => {
		const origFetch = window.fetch;
		window.fetch = async (...args) => {
			try {
				window.dispatchEvent(new Event('requestStarted'));
				const response = await origFetch(...args);
				window.dispatchEvent(new Event('requestEnded'));
				return response;
			} catch (err) {
				window.dispatchEvent(new Event('requestEnded'));
				throw err;
			}
		}
		
		const origXHR = window.XMLHttpRequest;
		window.XMLHttpRequest = function(...args) {
			const xhr = new origXHR(...args);
			const origOpen = xhr.open;
			xhr.open = function(...args) {
				window.dispatchEvent(new Event('requestStarted'));
				xhr.addEventListener('loadend', () => {
					window.dispatchEvent(new Event('requestEnded'));
				});
				return origOpen.apply(xhr, args);
			}
			return xhr;
		}

		// Add event listeners
		window.addEventListener('requestStarted', () => {
			window.__requestCount = (window.__requestCount || 0) + 1;
		});
		window.addEventListener('requestEnded', () => {
			window.__requestCount = Math.max(0, (window.__requestCount || 0) - 1);
		});
	}`)
	
	// Poll for request count
	go func() {
		ticker := time.NewTicker(100 * time.Millisecond)
		defer ticker.Stop()

		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				count := page.MustEval(`() => window.__requestCount || 0`).Int()
				if count > activeRequests {
					requestStarted <- true
				} else if count < activeRequests {
					requestEnded <- true
				}
				activeRequests = count
			}
		}
	}()
	
	// Wait for network idle
	timeout := time.After(10 * time.Second)
	lastActivity := time.Now()
	
	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-timeout:
			return nil
		case <-requestStarted:
			activeRequests++
			lastActivity = time.Now()
		case <-requestEnded:
			activeRequests--
			lastActivity = time.Now()
		default:
			if activeRequests == 0 && time.Since(lastActivity) > 500*time.Millisecond {
				return nil
			}
			time.Sleep(100 * time.Millisecond)
		}
	}
}

// applyAntiDetectionMeasures applies various anti-detection measures to the browser
func (b *Browser) applyAntiDetectionMeasures(ctx context.Context, page *rod.Page) error {
	// Apply anti-detection scripts
	script := `
		// Override webdriver property
		Object.defineProperty(navigator, 'webdriver', {
			get: () => undefined
		});

		// Override languages
		Object.defineProperty(navigator, 'languages', {
			get: () => ['en-US']
		});

		// Override plugins
		Object.defineProperty(navigator, 'plugins', {
			get: () => [1, 2, 3, 4, 5]
		});

		// Add Chrome runtime
		window.chrome = { runtime: {} };

		// Override permissions
		const originalQuery = window.navigator.permissions.query;
		window.navigator.permissions.query = (parameters) => (
			parameters.name === 'notifications' ?
				Promise.resolve({ state: Notification.permission }) :
				originalQuery(parameters)
		);

		// Prevent shadow DOM detection
		(function() {
			const originalAttachShadow = Element.prototype.attachShadow;
			Element.prototype.attachShadow = function attachShadow(options) {
				return originalAttachShadow.call(this, { ...options, mode: "open" });
			};
		})();
	`
	
	page.MustEval(script)
	return nil
}

// Navigate navigates to a URL and waits for the page to load
func (b *Browser) Navigate(ctx context.Context, url string) error {
	b.mu.Lock()
	defer b.mu.Unlock()

	if b.browser == nil {
		return fmt.Errorf("browser not connected")
	}

	pages := b.browser.MustPages()
	if len(pages) == 0 {
		return fmt.Errorf("no pages available")
	}

	page := pages[0]
	
	// Apply anti-detection measures before navigation
	if err := b.applyAntiDetectionMeasures(ctx, page); err != nil {
		return fmt.Errorf("failed to apply anti-detection measures: %w", err)
	}

	// Navigate to URL
	if err := page.Navigate(url); err != nil {
		return fmt.Errorf("failed to navigate to URL: %w", err)
	}

	// Wait for network idle
	if err := b.waitForNetworkIdle(ctx, page); err != nil {
		return fmt.Errorf("failed to wait for network idle: %w", err)
	}

	return nil
}

// SaveCookies saves the current cookies to a file
func (b *Browser) SaveCookies(ctx context.Context, filepath string) error {
	b.mu.RLock()
	defer b.mu.RUnlock()

	if b.browser == nil {
		return fmt.Errorf("browser not connected")
	}

	pages := b.browser.MustPages()
	if len(pages) == 0 {
		return fmt.Errorf("no pages available")
	}

	page := pages[0]
	cookies, err := page.Cookies([]string{})  // Get all cookies
	if err != nil {
		return fmt.Errorf("failed to get cookies: %w", err)
	}

	// Create directory if it doesn't exist
	dir := path.Dir(filepath)
	if err := os.MkdirAll(dir, 0755); err != nil {
		return fmt.Errorf("failed to create directory: %w", err)
	}

	// Save cookies to file
	data, err := json.Marshal(cookies)
	if err != nil {
		return fmt.Errorf("failed to marshal cookies: %w", err)
	}

	if err := os.WriteFile(filepath, data, 0644); err != nil {
		return fmt.Errorf("failed to write cookies file: %w", err)
	}

	return nil
}

// LoadCookies loads cookies from a file
func (b *Browser) LoadCookies(ctx context.Context, filepath string) error {
	b.mu.Lock()
	defer b.mu.Unlock()

	if b.browser == nil {
		return fmt.Errorf("browser not connected")
	}

	pages := b.browser.MustPages()
	if len(pages) == 0 {
		return fmt.Errorf("no pages available")
	}

	page := pages[0]

	// Read cookies file
	data, err := os.ReadFile(filepath)
	if err != nil {
		return fmt.Errorf("failed to read cookies file: %w", err)
	}

	var cookies []*proto.NetworkCookieParam
	if err := json.Unmarshal(data, &cookies); err != nil {
		return fmt.Errorf("failed to unmarshal cookies: %w", err)
	}

	// Set cookies
	if err := page.SetCookies(cookies); err != nil {
		return fmt.Errorf("failed to set cookies: %w", err)
	}

	return nil
}

// TakeScreenshot takes a screenshot of the current page
func (b *Browser) TakeScreenshot(ctx context.Context, fullPage bool) (string, error) {
	b.mu.RLock()
	defer b.mu.RUnlock()

	if b.browser == nil {
		return "", fmt.Errorf("browser not connected")
	}

	pages := b.browser.MustPages()
	if len(pages) == 0 {
		return "", fmt.Errorf("no pages available")
	}

	page := pages[0]

	var buf []byte
	var err error

	if fullPage {
		buf, err = page.Screenshot(true, &proto.PageCaptureScreenshot{
			Format:      proto.PageCaptureScreenshotFormatPng,
			FromSurface: true,
			CaptureBeyondViewport: true,
		})
	} else {
		buf, err = page.Screenshot(false, &proto.PageCaptureScreenshot{
			Format:      proto.PageCaptureScreenshotFormatPng,
			FromSurface: true,
		})
	}

	if err != nil {
		return "", fmt.Errorf("failed to take screenshot: %w", err)
	}

	// Convert to base64
	return base64.StdEncoding.EncodeToString(buf), nil
}

// GetScrollInfo returns the number of pixels above and below the viewport
func (b *Browser) GetScrollInfo(ctx context.Context, page *rod.Page) (int, int, error) {
	script := `() => {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		const scrollHeight = Math.max(
			document.body.scrollHeight,
			document.documentElement.scrollHeight,
			document.body.offsetHeight,
			document.documentElement.offsetHeight,
			document.body.clientHeight,
			document.documentElement.clientHeight
		);
		const clientHeight = document.documentElement.clientHeight;
		return {
			pixelsAbove: Math.round(scrollTop),
			pixelsBelow: Math.round(Math.max(0, scrollHeight - clientHeight - scrollTop))
		};
	}`

	result := page.MustEval(script)
	pixelsAbove := result.Get("pixelsAbove").Int()
	pixelsBelow := result.Get("pixelsBelow").Int()

	return pixelsAbove, pixelsBelow, nil
}

// ElementInfo represents information about a DOM element
type ElementInfo struct {
	TagName    string            `json:"tag_name"`
	Text      string            `json:"text"`
	HTML      string            `json:"html"`
	Attributes map[string]string `json:"attributes"`
	XPath     string            `json:"xpath"`
	Selector  string            `json:"selector"`
}

// FindElement finds an element using various selectors
func (b *Browser) FindElement(ctx context.Context, selector string, selectorType string) (*ElementInfo, error) {
	b.mu.RLock()
	defer b.mu.RUnlock()

	if b.browser == nil {
		return nil, fmt.Errorf("browser not connected")
	}

	pages := b.browser.MustPages()
	if len(pages) == 0 {
		return nil, fmt.Errorf("no pages available")
	}

	page := pages[0]

	var el *rod.Element
	var err error

	switch selectorType {
	case "css":
		el, err = page.Element(selector)
	case "xpath":
		el, err = page.ElementX(selector)
	default:
		return nil, fmt.Errorf("unsupported selector type: %s", selectorType)
	}

	if err != nil {
		return nil, fmt.Errorf("failed to find element: %w", err)
	}

	if el == nil {
		return nil, fmt.Errorf("element not found")
	}

	// Get element information
	info := &ElementInfo{
		TagName:    el.MustDescribe().LocalName,
		Attributes: make(map[string]string),
	}

	// Get text content
	text, err := el.Text()
	if err == nil {
		info.Text = text
	}

	// Get HTML content
	html, err := el.HTML()
	if err == nil {
		info.HTML = html
	}

	// Get attributes
	attrs := el.MustDescribe().Attributes
	for i := 0; i < len(attrs); i += 2 {
		info.Attributes[attrs[i]] = attrs[i+1]
	}

	// Get XPath
	info.XPath = el.MustEval(`node => {
		if (node.nodeType !== Node.ELEMENT_NODE) return null;
		const parts = [];
		while (node && node.nodeType === Node.ELEMENT_NODE) {
			let sibling = node.previousSibling;
			let count = 1;
			while (sibling) {
				if (sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName === node.tagName) {
					count++;
				}
				sibling = sibling.previousSibling;
			}
			const index = count === 1 ? '' : '['+count+']';
			parts.unshift(node.tagName.toLowerCase() + index);
			node = node.parentNode;
		}
		return '/' + parts.join('/');
	}`).String()

	// Get CSS selector
	info.Selector = el.MustEval(`node => {
		let path = [];
		while (node.nodeType === Node.ELEMENT_NODE) {
			let selector = node.tagName.toLowerCase();
			if (node.id) {
				selector += '#' + node.id;
				path.unshift(selector);
				break;
			} else {
				let sibling = node.previousSibling;
				let index = 1;
				while (sibling) {
					if (sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName === node.tagName) {
						index++;
					}
					sibling = sibling.previousSibling;
				}
				if (index > 1) {
					selector += ':nth-of-type('+index+')';
				}
				path.unshift(selector);
				node = node.parentNode;
			}
		}
		return path.join(' > ');
	}`).String()

	return info, nil
}

// ClickElement clicks an element using various selectors
func (b *Browser) ClickElement(ctx context.Context, selector string, selectorType string) error {
	b.mu.Lock()
	defer b.mu.Unlock()

	if b.browser == nil {
		return fmt.Errorf("browser not connected")
	}

	pages := b.browser.MustPages()
	if len(pages) == 0 {
		return fmt.Errorf("no pages available")
	}

	page := pages[0]

	var el *rod.Element
	var err error

	switch selectorType {
	case "css":
		el, err = page.Element(selector)
	case "xpath":
		el, err = page.ElementX(selector)
	default:
		return fmt.Errorf("unsupported selector type: %s", selectorType)
	}

	if err != nil {
		return fmt.Errorf("failed to find element: %w", err)
	}

	if el == nil {
		return fmt.Errorf("element not found")
	}

	// Scroll element into view
	err = el.ScrollIntoView()
	if err != nil {
		return fmt.Errorf("failed to scroll element into view: %w", err)
	}

	// Wait for element to be stable
	err = el.WaitStable(2 * time.Second)
	if err != nil {
		return fmt.Errorf("failed to wait for element stability: %w", err)
	}

	// Click the element
	err = el.Click(proto.InputMouseButtonLeft, 1)
	if err != nil {
		return fmt.Errorf("failed to click element: %w", err)
	}

	// Wait for any navigation to complete
	err = page.WaitStable(2 * time.Second)
	if err != nil {
		return fmt.Errorf("failed to wait for page stability: %w", err)
	}

	return nil
}

// InputText inputs text into an element using various selectors
func (b *Browser) InputText(ctx context.Context, selector string, selectorType string, text string) error {
	b.mu.Lock()
	defer b.mu.Unlock()

	if b.browser == nil {
		return fmt.Errorf("browser not connected")
	}

	pages := b.browser.MustPages()
	if len(pages) == 0 {
		return fmt.Errorf("no pages available")
	}

	page := pages[0]

	var el *rod.Element
	var err error

	switch selectorType {
	case "css":
		el, err = page.Element(selector)
	case "xpath":
		el, err = page.ElementX(selector)
	default:
		return fmt.Errorf("unsupported selector type: %s", selectorType)
	}

	if err != nil {
		return fmt.Errorf("failed to find element: %w", err)
	}

	if el == nil {
		return fmt.Errorf("element not found")
	}

	// Scroll element into view
	err = el.ScrollIntoView()
	if err != nil {
		return fmt.Errorf("failed to scroll element into view: %w", err)
	}

	// Wait for element to be stable
	err = el.WaitStable(2 * time.Second)
	if err != nil {
		return fmt.Errorf("failed to wait for element stability: %w", err)
	}

	// Clear and input text
	err = el.MustSelectAllText().Input(text)
	if err != nil {
		return fmt.Errorf("failed to input text: %w", err)
	}

	return nil
} 