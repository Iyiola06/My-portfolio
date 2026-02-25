// This file is now a proxy to avoid 'next/headers' leakage into client components.
// It is recommended to import directly from @/lib/supabase/client or @/lib/supabase/server.

export { createBrowserSupabaseClient } from './supabase/client';
// Do NOT export createClient here as it imports next/headers
