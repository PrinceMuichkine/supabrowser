/**
 * Supabase client configuration
 * 
 * This file exports a Supabase client instance for use throughout the application.
 * 
 * Important: Install the @supabase/supabase-js package:
 * npm install @supabase/supabase-js
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// We can't use the env.ts file directly due to circular dependencies
// So we access process.env directly
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase URL or anon key is missing. Make sure to set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file.'
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to get user session
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting session:', error.message);
    return null;
  }
  return data.session;
};

// Helper function to get user
export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error getting user:', error.message);
    return null;
  }
  return data.user;
};
