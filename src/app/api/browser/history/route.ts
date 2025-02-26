import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/supabase';

export async function GET() {
  try {
    const { data: session } = await supabase.auth.getSession();
    
    if (!session.session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from('browser_history')
      .select('*')
      .order('visited_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching browser history:', error);
      return NextResponse.json(
        { error: 'Failed to fetch browser history' },
        { status: 500 }
      );
    }

    return NextResponse.json({ history: data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { data: session } = await supabase.auth.getSession();
    
    if (!session.session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { url, title, favicon } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('browser_history')
      .insert({
        user_id: session.session.user.id,
        url,
        title,
        favicon
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding browser history:', error);
      return NextResponse.json(
        { error: 'Failed to add browser history' },
        { status: 500 }
      );
    }

    return NextResponse.json({ history: data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 