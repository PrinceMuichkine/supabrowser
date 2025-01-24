package telemetry

import (
	"fmt"
	"sync"
	"time"
)

// Metric represents a single telemetry metric
type Metric struct {
	Name      string                 `json:"name"`
	Value     float64               `json:"value"`
	Labels    map[string]string     `json:"labels,omitempty"`
	Timestamp time.Time             `json:"timestamp"`
}

// Event represents a telemetry event
type Event struct {
	Name      string                 `json:"name"`
	Data      map[string]interface{} `json:"data"`
	Timestamp time.Time             `json:"timestamp"`
}

// Config holds telemetry service configuration
type Config struct {
	Enabled     bool   `json:"enabled"`
	MetricsPort int    `json:"metrics_port"`
	TraceURL    string `json:"trace_url,omitempty"`
}

// Service provides telemetry and monitoring capabilities
type Service interface {
	// Metrics
	RecordMetric(name string, value float64, labels map[string]string)
	GetMetric(name string) []Metric
	
	// Events
	RecordEvent(name string, data map[string]interface{})
	GetEvents(name string) []Event
	
	// Browser-specific metrics
	RecordPageLoad(duration time.Duration, url string)
	RecordAction(name string, duration time.Duration, success bool)
	RecordError(category string, err error)
	
	// Resource usage
	RecordMemoryUsage(bytes int64)
	RecordCPUUsage(percentage float64)
}

// service implements the Service interface
type service struct {
	config   Config
	metrics  map[string][]Metric
	events   map[string][]Event
	mu       sync.RWMutex
}

// NewService creates a new telemetry service
func NewService(config Config) Service {
	return &service{
		config:  config,
		metrics: make(map[string][]Metric),
		events:  make(map[string][]Event),
	}
}

func (s *service) RecordMetric(name string, value float64, labels map[string]string) {
	s.mu.Lock()
	defer s.mu.Unlock()

	metric := Metric{
		Name:      name,
		Value:     value,
		Labels:    labels,
		Timestamp: time.Now(),
	}

	s.metrics[name] = append(s.metrics[name], metric)
}

func (s *service) GetMetric(name string) []Metric {
	s.mu.RLock()
	defer s.mu.RUnlock()
	
	return s.metrics[name]
}

func (s *service) RecordEvent(name string, data map[string]interface{}) {
	s.mu.Lock()
	defer s.mu.Unlock()

	event := Event{
		Name:      name,
		Data:      data,
		Timestamp: time.Now(),
	}

	s.events[name] = append(s.events[name], event)
}

func (s *service) GetEvents(name string) []Event {
	s.mu.RLock()
	defer s.mu.RUnlock()
	
	return s.events[name]
}

func (s *service) RecordPageLoad(duration time.Duration, url string) {
	s.RecordMetric("page_load_duration", duration.Seconds(), map[string]string{
		"url": url,
	})
}

func (s *service) RecordAction(name string, duration time.Duration, success bool) {
	s.RecordMetric("action_duration", duration.Seconds(), map[string]string{
		"action":  name,
		"success": fmt.Sprintf("%v", success),
	})
}

func (s *service) RecordError(category string, err error) {
	s.RecordEvent("error", map[string]interface{}{
		"category": category,
		"error":    err.Error(),
	})
}

func (s *service) RecordMemoryUsage(bytes int64) {
	s.RecordMetric("memory_usage_bytes", float64(bytes), nil)
}

func (s *service) RecordCPUUsage(percentage float64) {
	s.RecordMetric("cpu_usage_percent", percentage, nil)
} 