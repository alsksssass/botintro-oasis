// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pilpxdimraerkypqaska.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpbHB4ZGltcmFlcmt5cHFhc2thIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NDE2NjEsImV4cCI6MjA1NzUxNzY2MX0.XP3jGyvB3u64yq9Bm101iOR29ZeIPuVavWtOXg1g2l0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);