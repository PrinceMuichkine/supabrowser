package vision

import (
	"context"
	"fmt"
)

// DetectedElement represents an element detected in a screenshot
type DetectedElement struct {
	Type        string  `json:"type"`
	Text        string  `json:"text,omitempty"`
	Confidence  float64 `json:"confidence"`
	BoundingBox Box     `json:"bounding_box"`
	Attributes  map[string]string `json:"attributes,omitempty"`
}

// Box represents a bounding box in the image
type Box struct {
	X      int `json:"x"`
	Y      int `json:"y"`
	Width  int `json:"width"`
	Height int `json:"height"`
}

// Analysis represents the complete analysis of a screenshot
type Analysis struct {
	Elements []DetectedElement `json:"elements"`
	Text     string           `json:"text"`
	Actions  []string         `json:"actions"`
}

// Config holds configuration for the vision service
type Config struct {
	Model       string  `json:"model"`
	MaxTokens   int     `json:"max_tokens"`
	Temperature float64 `json:"temperature"`
	APIKey      string  `json:"api_key"`
}

// Service provides screenshot analysis capabilities
type Service interface {
	// Core analysis
	AnalyzeScreenshot(ctx context.Context, screenshot []byte) (*Analysis, error)
	DetectElements(ctx context.Context, screenshot []byte) ([]DetectedElement, error)
	
	// Element operations
	GetElementByText(text string, elements []DetectedElement) (*DetectedElement, error)
	GetElementsByType(elementType string, elements []DetectedElement) []DetectedElement
}

// service implements the Service interface
type service struct {
	config Config
	prompt string
}

// NewService creates a new vision service
func NewService(config Config) Service {
	return &service{
		config: config,
		prompt: `Analyze this screenshot and identify:
1. Interactive elements (buttons, links, inputs)
2. Text content and its location
3. Visual hierarchy and layout
4. Possible user actions

Format the response as JSON with:
{
  "elements": [
    {
      "type": "button|link|input|text",
      "text": "element text",
      "confidence": 0.95,
      "bounding_box": {"x": 0, "y": 0, "width": 100, "height": 30},
      "attributes": {"role": "button", "state": "enabled"}
    }
  ],
  "text": "Complete visible text content",
  "actions": ["possible", "user", "actions"]
}`,
	}
}

func (s *service) AnalyzeScreenshot(ctx context.Context, screenshot []byte) (*Analysis, error) {
	// TODO: Implement vision model API call
	// 1. Encode screenshot as base64
	// 2. Call vision API with prompt
	// 3. Parse response into Analysis struct
	return nil, fmt.Errorf("not implemented")
}

func (s *service) DetectElements(ctx context.Context, screenshot []byte) ([]DetectedElement, error) {
	analysis, err := s.AnalyzeScreenshot(ctx, screenshot)
	if err != nil {
		return nil, err
	}
	return analysis.Elements, nil
}

func (s *service) GetElementByText(text string, elements []DetectedElement) (*DetectedElement, error) {
	for _, elem := range elements {
		if elem.Text == text {
			return &elem, nil
		}
	}
	return nil, fmt.Errorf("element with text '%s' not found", text)
}

func (s *service) GetElementsByType(elementType string, elements []DetectedElement) []DetectedElement {
	var result []DetectedElement
	for _, elem := range elements {
		if elem.Type == elementType {
			result = append(result, elem)
		}
	}
	return result
} 