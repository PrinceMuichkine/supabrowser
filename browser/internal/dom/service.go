package dom

import (
	"context"
)

// Element represents a DOM element with its properties and state
type Element struct {
	TagName        string            `json:"tag_name"`
	XPath         string            `json:"xpath"`
	Attributes    map[string]string `json:"attributes"`
	Children      []Element         `json:"children"`
	IsVisible     bool              `json:"is_visible"`
	IsInteractive bool              `json:"is_interactive"`
	Text          string            `json:"text,omitempty"`
}

// DOMTree represents the complete DOM structure
type DOMTree struct {
	Root     Element            `json:"root"`
	Metadata map[string]string `json:"metadata"`
}

// Service provides DOM manipulation and querying capabilities
type Service interface {
	// Tree operations
	BuildTree(ctx context.Context) (*DOMTree, error)
	FindElement(selector string) (*Element, error)
	FindElements(selector string) ([]Element, error)
	
	// Element operations
	GetText(element *Element) (string, error)
	IsVisible(element *Element) (bool, error)
	GetAttribute(element *Element, name string) (string, error)
	
	// JavaScript injection
	InjectScript(script string) error
}

// service implements the Service interface
type service struct {
	sessionID string
	jsBuilder string // Path to DOM tree builder JavaScript
}

// NewService creates a new DOM service instance
func NewService(sessionID string) Service {
	return &service{
		sessionID: sessionID,
		jsBuilder: `
			function buildDOMTree(node) {
				if (!node) return null;
				
				const element = {
					tagName: node.tagName ? node.tagName.toLowerCase() : "#text",
					xpath: getXPath(node),
					attributes: {},
					children: [],
					isVisible: isElementVisible(node),
					isInteractive: isInteractive(node),
					text: node.textContent || ""
				};
				
				// Get attributes
				if (node.attributes) {
					for (let attr of node.attributes) {
						element.attributes[attr.name] = attr.value;
					}
				}
				
				// Process children
				for (let child of node.childNodes) {
					const childTree = buildDOMTree(child);
					if (childTree) element.children.push(childTree);
				}
				
				return element;
			}
			
			function getXPath(node) {
				if (!node) return "";
				if (node.id) return '//*[@id="' + node.id + '"]';
				
				let path = "";
				while (node && node.nodeType === Node.ELEMENT_NODE) {
					let sibling = node;
					let sibCount = 1;
					while (sibling = sibling.previousSibling) {
						if (sibling.nodeType === Node.ELEMENT_NODE && 
							sibling.tagName === node.tagName) {
							sibCount++;
						}
					}
					path = '/' + node.tagName.toLowerCase() + 
						   (sibCount > 1 ? '['+sibCount+']' : '') + path;
					node = node.parentNode;
				}
				return path;
			}
			
			function isElementVisible(element) {
				if (!element) return false;
				const style = window.getComputedStyle(element);
				return style.display !== 'none' && 
					   style.visibility !== 'hidden' && 
					   style.opacity !== '0';
			}
			
			function isInteractive(element) {
				const interactiveTags = ['a', 'button', 'input', 'select', 'textarea'];
				return interactiveTags.includes(element.tagName.toLowerCase()) ||
					   element.onclick != null ||
					   element.getAttribute('role') === 'button';
			}
			
			return buildDOMTree(document.documentElement);
		`,
	}
}

func (s *service) BuildTree(ctx context.Context) (*DOMTree, error) {
	// TODO: Execute the JS builder script in the browser session
	// and parse the result into a DOMTree structure
	return nil, nil
}

func (s *service) FindElement(selector string) (*Element, error) {
	// TODO: Implement element finding using various selector types
	// (CSS, XPath, etc.)
	return nil, nil
}

func (s *service) FindElements(selector string) ([]Element, error) {
	// TODO: Implement multiple element finding
	return nil, nil
}

func (s *service) GetText(element *Element) (string, error) {
	return element.Text, nil
}

func (s *service) IsVisible(element *Element) (bool, error) {
	return element.IsVisible, nil
}

func (s *service) GetAttribute(element *Element, name string) (string, error) {
	if val, ok := element.Attributes[name]; ok {
		return val, nil
	}
	return "", nil
}

func (s *service) InjectScript(script string) error {
	// TODO: Implement JavaScript injection into the page
	return nil
} 