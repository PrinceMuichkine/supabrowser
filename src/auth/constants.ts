/**
 * Auth domain constants
 * 
 * Constants related to authentication functionality
 */

// Session durations
export const SESSION_EXPIRY = 60 * 60 * 24 * 7; // 7 days in seconds
export const REMEMBER_ME_EXPIRY = 60 * 60 * 24 * 30; // 30 days in seconds

// Auth routes
export const ROUTES = {
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify',
  CALLBACK: '/auth/callback',
};

// Auth error codes
export enum AuthErrorCode {
  INVALID_CREDENTIALS = 'auth/invalid-credentials',
  USER_NOT_FOUND = 'auth/user-not-found',
  EMAIL_EXISTS = 'auth/email-already-exists',
  WEAK_PASSWORD = 'auth/weak-password',
  EXPIRED_SESSION = 'auth/expired-session',
};

// Auth provider types
export enum AuthProvider {
  EMAIL = 'email',
  GOOGLE = 'google',
  GITHUB = 'github',
};
