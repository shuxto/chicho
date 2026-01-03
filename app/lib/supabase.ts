import { createClient } from '@supabase/supabase-js';

// --- CHICHO DATABASE CONFIGURATION ---
// We are hardcoding these to ensure Vercel connects successfully immediately.

const supabaseUrl = "https://mzmtlyrdkipljquygsmx.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16bXRseXJka2lwbGpxdXlnc214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NjYxMTMsImV4cCI6MjA4MzA0MjExM30.2-wKQh6gdXZMsw7RbWq6xH9wAiCdMcXtz7u477hAg9o";

// Export the connection for the rest of the app to use
export const supabase = createClient(supabaseUrl, supabaseKey);