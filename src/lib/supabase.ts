
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/database.types';

// These would typically come from environment variables
// For development, we're using placeholder values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
