package actions

import (
	"context"
	"fmt"
	"sync"
)

// ActionResult represents the result of executing an action
type ActionResult struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   string     `json:"error,omitempty"`
}

// ActionParams represents the parameters for an action
type ActionParams struct {
	Selector string                 `json:"selector,omitempty"`
	Value    string                 `json:"value,omitempty"`
	Options  map[string]interface{} `json:"options,omitempty"`
}

// ActionFunc is the type for action implementations
type ActionFunc func(ctx context.Context, params ActionParams) ActionResult

// Action represents a registered browser action
type Action struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Handler     ActionFunc
	RequiresDom bool `json:"requires_dom"`
}

// Registry manages the available browser actions
type Registry struct {
	actions map[string]Action
	mu      sync.RWMutex
}

// NewRegistry creates a new action registry
func NewRegistry() *Registry {
	r := &Registry{
		actions: make(map[string]Action),
	}
	r.registerDefaultActions()
	return r
}

// Register adds a new action to the registry
func (r *Registry) Register(action Action) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, exists := r.actions[action.Name]; exists {
		return fmt.Errorf("action already registered: %s", action.Name)
	}

	r.actions[action.Name] = action
	return nil
}

// Execute runs a registered action
func (r *Registry) Execute(ctx context.Context, name string, params ActionParams) ActionResult {
	r.mu.RLock()
	action, exists := r.actions[name]
	r.mu.RUnlock()

	if !exists {
		return ActionResult{
			Success: false,
			Error:   fmt.Sprintf("action not found: %s", name),
		}
	}

	return action.Handler(ctx, params)
}

// GetActions returns all registered actions
func (r *Registry) GetActions() []Action {
	r.mu.RLock()
	defer r.mu.RUnlock()

	actions := make([]Action, 0, len(r.actions))
	for _, action := range r.actions {
		actions = append(actions, action)
	}
	return actions
}

func (r *Registry) registerDefaultActions() {
	defaultActions := []Action{
		{
			Name:        "click",
			Description: "Click on an element",
			RequiresDom: true,
			Handler: func(ctx context.Context, params ActionParams) ActionResult {
				// TODO: Implement click action
				return ActionResult{Success: false, Error: "not implemented"}
			},
		},
		{
			Name:        "type",
			Description: "Type text into an input element",
			RequiresDom: true,
			Handler: func(ctx context.Context, params ActionParams) ActionResult {
				// TODO: Implement type action
				return ActionResult{Success: false, Error: "not implemented"}
			},
		},
		{
			Name:        "select",
			Description: "Select an option from a dropdown",
			RequiresDom: true,
			Handler: func(ctx context.Context, params ActionParams) ActionResult {
				// TODO: Implement select action
				return ActionResult{Success: false, Error: "not implemented"}
			},
		},
		{
			Name:        "scroll",
			Description: "Scroll the page or element",
			RequiresDom: true,
			Handler: func(ctx context.Context, params ActionParams) ActionResult {
				// TODO: Implement scroll action
				return ActionResult{Success: false, Error: "not implemented"}
			},
		},
		{
			Name:        "wait",
			Description: "Wait for an element or condition",
			RequiresDom: true,
			Handler: func(ctx context.Context, params ActionParams) ActionResult {
				// TODO: Implement wait action
				return ActionResult{Success: false, Error: "not implemented"}
			},
		},
	}

	for _, action := range defaultActions {
		r.Register(action)
	}
} 