import { createClient } from '@supabase/supabase-js';

// 1. Read the secret URL from your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// 2. Read the secret KEY from your .env.local file
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 3. Create and export the connection
export const supabase = createClient(supabaseUrl, supabaseKey);