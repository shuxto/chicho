import { createClient } from '@supabase/supabase-js';

// --- CHICHO DATABASE CONFIGURATION ---

// In PHP, you might use getenv('DB_PASSWORD').
// In Next.js, we use process.env.VARIABLE_NAME.

// The '!' at the end tells TypeScript "Trust me, this variable exists".
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Export the connection for the rest of the app to use
export const supabase = createClient(supabaseUrl, supabaseKey);