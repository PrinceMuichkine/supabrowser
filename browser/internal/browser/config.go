package browser

import "time"

// Config represents browser configuration options
type Config struct {
	Headless         bool     `json:"headless"`
	DisableSecurity  bool     `json:"disable_security"`
	ExtraChromiumArgs []string `json:"extra_chromium_args"`
	ChromeInstancePath *string  `json:"chrome_instance_path,omitempty"`
	WssURL           *string  `json:"wss_url,omitempty"`
	CdpURL           *string  `json:"cdp_url,omitempty"`
	ProxySettings    *ProxySettings `json:"proxy,omitempty"`
}

// ProxySettings represents proxy configuration
type ProxySettings struct {
	Server   string  `json:"server"`
	Username *string `json:"username,omitempty"`
	Password *string `json:"password,omitempty"`
}

// NewDefaultConfig creates a new Config with default values
func NewDefaultConfig() *Config {
	return &Config{
		Headless:        false,
		DisableSecurity: true,
		ExtraChromiumArgs: []string{},
	}
}

// BrowserConfig holds browser-specific settings
type BrowserConfig struct {
	Headless         bool     `json:"headless"`
	DisableSecurity  bool     `json:"disable_security"`
	ExtraArgs        []string `json:"extra_args"`
	ChromePath       string   `json:"chrome_path,omitempty"`
	WsURL           string   `json:"ws_url,omitempty"`
	CdpURL          string   `json:"cdp_url,omitempty"`
	Timeout         time.Duration `json:"timeout"`
	MaxConcurrent   int      `json:"max_concurrent"`
}

// VisionConfig holds settings for vision/screenshot analysis
type VisionConfig struct {
	Model        string  `json:"model"`
	MaxTokens    int     `json:"max_tokens"`
	Temperature  float64 `json:"temperature"`
	ImageTokens  int     `json:"image_tokens"`
	APIKey       string  `json:"api_key,omitempty"`
}

// ActionsConfig holds settings for browser actions
type ActionsConfig struct {
	EnabledActions []string `json:"enabled_actions"`
	MaxRetries    int      `json:"max_retries"`
	RetryDelay    time.Duration `json:"retry_delay"`
}

// SecurityConfig holds security-related settings
type SecurityConfig struct {
	AllowedOrigins []string `json:"allowed_origins"`
	MaxRequests    int      `json:"max_requests"`
	RateLimit     int      `json:"rate_limit"`
	APIKeys       []string `json:"api_keys,omitempty"`
} 