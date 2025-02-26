--------------- ENUMS ---------------

--------------- TABLES ---------------

-- Profiles table
CREATE TABLE public.profiles (
    id uuid references auth.users on delete cascade primary key,
    full_name text,
    email text,
    username text UNIQUE NOT NULL,
    birthdate date,
    organization text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    CONSTRAINT profiles_email_key UNIQUE (email),
    CONSTRAINT profiles_username_check CHECK (
        username ~ '^[a-zA-Z0-9_\-]{3,35}$'
    )
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);
CREATE INDEX IF NOT EXISTS profiles_username_idx ON profiles(username);

-- Create browser_history table
CREATE TABLE IF NOT EXISTS public.browser_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    title TEXT,
    visited_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    favicon TEXT
);

-- Create browser_bookmarks table
CREATE TABLE IF NOT EXISTS public.browser_bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    favicon TEXT,
    folder TEXT
);

-- Create browser_settings table
CREATE TABLE IF NOT EXISTS public.browser_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    default_search_engine TEXT DEFAULT 'google',
    enable_javascript BOOLEAN DEFAULT true,
    enable_cookies BOOLEAN DEFAULT true,
    enable_adblock BOOLEAN DEFAULT false,
    enable_tracking_protection BOOLEAN DEFAULT true,
    default_zoom_level INTEGER DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT unique_user_settings UNIQUE (user_id)
);

-- Create RLS policies
ALTER TABLE public.browser_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.browser_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.browser_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for browser_history
CREATE POLICY "Users can only view their own history" 
    ON public.browser_history 
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own history" 
    ON public.browser_history 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can only update their own history" 
    ON public.browser_history 
    FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can only delete their own history" 
    ON public.browser_history 
    FOR DELETE 
    USING (auth.uid() = user_id);

-- Create policy for browser_bookmarks
CREATE POLICY "Users can only view their own bookmarks" 
    ON public.browser_bookmarks 
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own bookmarks" 
    ON public.browser_bookmarks 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can only update their own bookmarks" 
    ON public.browser_bookmarks 
    FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can only delete their own bookmarks" 
    ON public.browser_bookmarks 
    FOR DELETE 
    USING (auth.uid() = user_id);

-- Create policy for browser_settings
CREATE POLICY "Users can only view their own settings" 
    ON public.browser_settings 
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own settings" 
    ON public.browser_settings 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can only update their own settings" 
    ON public.browser_settings 
    FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can only delete their own settings" 
    ON public.browser_settings 
    FOR DELETE 
    USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_browser_history_user_id ON public.browser_history(user_id);
CREATE INDEX IF NOT EXISTS idx_browser_history_visited_at ON public.browser_history(visited_at);
CREATE INDEX IF NOT EXISTS idx_browser_bookmarks_user_id ON public.browser_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_browser_settings_user_id ON public.browser_settings(user_id);