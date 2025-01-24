package logging

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"time"
)

// Level represents a logging level
type Level int

const (
	DebugLevel Level = iota
	InfoLevel
	WarnLevel
	ErrorLevel
	FatalLevel
)

// Config holds logging configuration
type Config struct {
	Level      Level  `json:"level"`
	File       string `json:"file,omitempty"`
	JSONFormat bool   `json:"json_format"`
}

// Fields represents structured logging fields
type Fields map[string]interface{}

// Entry represents a log entry
type Entry struct {
	Level     Level                  `json:"level"`
	Message   string                 `json:"message"`
	Fields    Fields                 `json:"fields,omitempty"`
	Timestamp time.Time             `json:"timestamp"`
}

// Logger provides structured logging capabilities
type Logger interface {
	// Core logging methods
	Debug(msg string, fields Fields)
	Info(msg string, fields Fields)
	Warn(msg string, fields Fields)
	Error(msg string, fields Fields)
	Fatal(msg string, fields Fields)
	
	// Browser-specific logging
	LogPageLoad(url string, duration time.Duration, success bool)
	LogAction(name string, params interface{}, result interface{})
	LogError(err error, category string, fields Fields)
	
	// Configuration
	SetLevel(level Level)
	SetOutput(w io.Writer)
}

// logger implements the Logger interface
type logger struct {
	config Config
	output io.Writer
}

// NewLogger creates a new logger instance
func NewLogger(config Config) (Logger, error) {
	var output io.Writer = os.Stdout

	if config.File != "" {
		file, err := os.OpenFile(config.File, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
		if err != nil {
			return nil, fmt.Errorf("failed to open log file: %w", err)
		}
		output = file
	}

	return &logger{
		config: config,
		output: output,
	}, nil
}

func (l *logger) log(level Level, msg string, fields Fields) {
	if level < l.config.Level {
		return
	}

	entry := Entry{
		Level:     level,
		Message:   msg,
		Fields:    fields,
		Timestamp: time.Now(),
	}

	if l.config.JSONFormat {
		l.logJSON(entry)
	} else {
		l.logText(entry)
	}
}

func (l *logger) logJSON(entry Entry) {
	data, err := json.Marshal(entry)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to marshal log entry: %v\n", err)
		return
	}
	fmt.Fprintln(l.output, string(data))
}

func (l *logger) logText(entry Entry) {
	levelStr := map[Level]string{
		DebugLevel: "DEBUG",
		InfoLevel:  "INFO",
		WarnLevel:  "WARN",
		ErrorLevel: "ERROR",
		FatalLevel: "FATAL",
	}[entry.Level]

	fmt.Fprintf(l.output, "[%s] %s - %s", 
		entry.Timestamp.Format(time.RFC3339),
		levelStr,
		entry.Message,
	)

	if len(entry.Fields) > 0 {
		fmt.Fprintf(l.output, " | ")
		first := true
		for k, v := range entry.Fields {
			if !first {
				fmt.Fprintf(l.output, ", ")
			}
			fmt.Fprintf(l.output, "%s=%v", k, v)
			first = false
		}
	}
	fmt.Fprintln(l.output)
}

func (l *logger) Debug(msg string, fields Fields) {
	l.log(DebugLevel, msg, fields)
}

func (l *logger) Info(msg string, fields Fields) {
	l.log(InfoLevel, msg, fields)
}

func (l *logger) Warn(msg string, fields Fields) {
	l.log(WarnLevel, msg, fields)
}

func (l *logger) Error(msg string, fields Fields) {
	l.log(ErrorLevel, msg, fields)
}

func (l *logger) Fatal(msg string, fields Fields) {
	l.log(FatalLevel, msg, fields)
	os.Exit(1)
}

func (l *logger) LogPageLoad(url string, duration time.Duration, success bool) {
	l.Info("Page load completed", Fields{
		"url":      url,
		"duration": duration.String(),
		"success":  success,
	})
}

func (l *logger) LogAction(name string, params interface{}, result interface{}) {
	l.Debug("Browser action executed", Fields{
		"action": name,
		"params": params,
		"result": result,
	})
}

func (l *logger) LogError(err error, category string, fields Fields) {
	if fields == nil {
		fields = Fields{}
	}
	fields["error"] = err.Error()
	fields["category"] = category
	l.Error("Error occurred", fields)
}

func (l *logger) SetLevel(level Level) {
	l.config.Level = level
}

func (l *logger) SetOutput(w io.Writer) {
	l.output = w
} 