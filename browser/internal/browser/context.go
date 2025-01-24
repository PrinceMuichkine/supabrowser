package browser

import (
	"context"
	"fmt"

	"github.com/go-rod/rod"
	"github.com/go-rod/rod/lib/proto"
	"github.com/ysmood/gson"
)

// ContextConfig represents configuration for a browser context
type ContextConfig struct {
	UserAgent      string            `json:"user_agent,omitempty"`
	ViewportSize   *ViewportSize     `json:"viewport_size,omitempty"`
	Locale         string            `json:"locale,omitempty"`
	Timezone       string            `json:"timezone,omitempty"`
	Permissions    []string          `json:"permissions,omitempty"`
	Geolocation    *Geolocation      `json:"geolocation,omitempty"`
	HttpCredentials *HttpCredentials  `json:"http_credentials,omitempty"`
	ColorScheme    string            `json:"color_scheme,omitempty"`
	ExtraHeaders   map[string]string `json:"extra_headers,omitempty"`
}

// ViewportSize represents the viewport dimensions
type ViewportSize struct {
	Width  int `json:"width"`
	Height int `json:"height"`
}

// Geolocation represents geographic coordinates
type Geolocation struct {
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
	Accuracy  float64 `json:"accuracy"`
}

// HttpCredentials represents HTTP authentication credentials
type HttpCredentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// Context represents a browser context with enhanced capabilities
type Context struct {
	config  *ContextConfig
	browser *rod.Browser
	pages   []*rod.Page
}

// NewContextWithConfig creates a new browser context with the given configuration
func (b *Browser) NewContextWithConfig(ctx context.Context, config *ContextConfig) (*Context, error) {
	if b.browser == nil {
		return nil, fmt.Errorf("browser not connected")
	}

	// Create incognito browser context
	browser := b.browser.MustIncognito()

	// Apply context configuration
	if config != nil {
		// Create a new page to apply settings
		page := browser.MustPage()

		if config.UserAgent != "" {
			err := page.SetUserAgent(&proto.NetworkSetUserAgentOverride{
				UserAgent: config.UserAgent,
			})
			if err != nil {
				return nil, fmt.Errorf("failed to set user agent: %w", err)
			}
		}

		if config.ViewportSize != nil {
			width := config.ViewportSize.Width
			height := config.ViewportSize.Height
			err := page.SetViewport(&proto.EmulationSetDeviceMetricsOverride{
				Width:             width,
				Height:            height,
				DeviceScaleFactor: 1,
				Mobile:            false,
			})
			if err != nil {
				return nil, fmt.Errorf("failed to set viewport: %w", err)
			}
		}

		if config.Timezone != "" {
			// Set timezone using JavaScript
			js := fmt.Sprintf(`
				Intl.DateTimeFormat = new Proxy(Intl.DateTimeFormat, {
					construct(target, args) {
						if (args.length > 0) {
							args[1] = Object.assign({}, args[1], { timeZone: '%s' })
						}
						return new target(...args)
					}
				})
			`, config.Timezone)
			if _, err := page.EvalOnNewDocument(js); err != nil {
				return nil, fmt.Errorf("failed to set timezone: %w", err)
			}
		}

		if len(config.ExtraHeaders) > 0 {
			// Set headers using the CDP protocol directly
			headers := proto.NetworkHeaders{}
			for k, v := range config.ExtraHeaders {
				headers[k] = gson.New(v)
			}
			err := proto.NetworkSetExtraHTTPHeaders{
				Headers: headers,
			}.Call(page)
			if err != nil {
				return nil, fmt.Errorf("failed to set headers: %w", err)
			}
		}

		// Close the temporary page
		if err := page.Close(); err != nil {
			return nil, fmt.Errorf("failed to close temporary page: %w", err)
		}
	}

	return &Context{
		config:  config,
		browser: browser,
		pages:   make([]*rod.Page, 0),
	}, nil
}

// NewPage creates a new page in the context
func (c *Context) NewPage() (*rod.Page, error) {
	page := c.browser.MustPage()
	c.pages = append(c.pages, page)
	return page, nil
}

// Pages returns all pages in the context
func (c *Context) Pages() []*rod.Page {
	return c.pages
}

// Close closes the context and all its pages
func (c *Context) Close() error {
	for _, page := range c.pages {
		if err := page.Close(); err != nil {
			return fmt.Errorf("failed to close page: %w", err)
		}
	}
	return c.browser.Close()
} 