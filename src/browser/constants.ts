/**
 * Browser domain constants
 * 
 * Constants related to browser functionality
 */

// Browser tabs
export const MAX_TABS = 10;
export const DEFAULT_HOMEPAGE = 'https://www.google.com';

// Search engines
export enum SearchEngine {
  GOOGLE = 'google',
  BING = 'bing',
  DUCKDUCKGO = 'duckduckgo',
  BRAVE = 'brave',
}

// Default search engine
export const DEFAULT_SEARCH_ENGINE = SearchEngine.GOOGLE;

// Search engine URLs
export const SEARCH_ENGINE_URLS = {
  [SearchEngine.GOOGLE]: 'https://www.google.com/search?q=',
  [SearchEngine.BING]: 'https://www.bing.com/search?q=',
  [SearchEngine.DUCKDUCKGO]: 'https://duckduckgo.com/?q=',
  [SearchEngine.BRAVE]: 'https://search.brave.com/search?q=',
};

// Browser settings
export const SETTINGS = {
  ENABLE_JAVASCRIPT: true,
  ENABLE_COOKIES: true,
  ENABLE_ADBLOCK: false,
  ENABLE_TRACKING_PROTECTION: true,
  DEFAULT_ZOOM_LEVEL: 100,
};

// Content types
export enum ContentType {
  HTML = 'text/html',
  JSON = 'application/json',
  XML = 'application/xml',
  TEXT = 'text/plain',
  PDF = 'application/pdf',
  IMAGE = 'image/*',
  AUDIO = 'audio/*',
  VIDEO = 'video/*',
};
