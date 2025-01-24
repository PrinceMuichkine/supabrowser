package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/yourusername/supabrowser/internal/browser"
	"go.uber.org/zap"
)

type Server struct {
	browser *browser.Browser
	logger  *zap.Logger
}

func NewServer() (*Server, error) {
	logger, err := zap.NewProduction()
	if err != nil {
		return nil, err
	}

	b := browser.New(browser.NewDefaultConfig(), logger)
	if err := b.Connect(context.Background()); err != nil {
		return nil, err
	}

	return &Server{
		browser: b,
		logger:  logger,
	}, nil
}

func (s *Server) handleCreateContext(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var config browser.ContextConfig
	if err := json.NewDecoder(r.Body).Decode(&config); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	ctx, err := s.browser.NewContextWithConfig(r.Context(), &config)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Create initial page
	page, err := ctx.NewPage()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Return success response
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status": "success",
		"data": map[string]interface{}{
			"page_id": page.TargetID,
		},
	})
}

func (s *Server) handleNavigate(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		PageID string `json:"page_id"`
		URL    string `json:"url"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// TODO: Implement page lookup by ID and navigation
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"status": "success",
	})
}

func main() {
	// Create server
	server, err := NewServer()
	if err != nil {
		log.Fatalf("Failed to create server: %v", err)
	}

	// Set up HTTP routes
	mux := http.NewServeMux()
	mux.HandleFunc("/context", server.handleCreateContext)
	mux.HandleFunc("/navigate", server.handleNavigate)

	// Create HTTP server
	srv := &http.Server{
		Addr:    ":8080",
		Handler: mux,
	}

	// Handle graceful shutdown
	done := make(chan os.Signal, 1)
	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	log.Printf("Server started on :8080")

	<-done
	log.Printf("Server stopping...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server shutdown failed: %v", err)
	}

	if err := server.browser.Close(); err != nil {
		log.Printf("Failed to close browser: %v", err)
	}

	log.Printf("Server stopped")
} 