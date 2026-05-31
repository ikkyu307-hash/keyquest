/* ===== SUPABASE CLIENT CONFIG & ENV LOADER ===== */
let dbClient = null;
let currentUser = null;
let LIFF_ID = '2010004860-NKSZPBAQ'; // ใส่ LINE LIFF ID ของคุณที่นี่
let lineProfile = null;


async function initSupabase() {
  // Default values — use publishable (anon) key for client-side auth
  let url = 'https://npatytxlugjozsknegby.supabase.co';
  let anonKey = 'sb_publishable_eD8SsR0P1Jab7KPFcYkM0A_OrN_RD1k';

  // If we already have hardcoded credentials, skip fetching local files
  // to avoid browser console CORS/404 errors. We only fetch if they are placeholder values.
  const hasPlaceholders = url.includes('placeholder') || anonKey.includes('placeholder');

  if (hasPlaceholders) {
    try {
      // Attempt to fetch the local .env file, fallback to .env.example
      let res = await fetch('.env');
      if (!res.ok) {
        res = await fetch('.env.example');
      }
      if (res.ok) {
        const text = await res.text();
        text.split('\n').forEach(line => {
          const trimmedLine = line.trim();
          // Skip comments and empty lines
          if (!trimmedLine || trimmedLine.startsWith('#')) return;

          const parts = trimmedLine.split('=');
          if (parts.length >= 2) {
            const key = parts[0].trim();
            const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');

            if (key === 'SUPABASE_URL' || key === 'NEXT_PUBLIC_SUPABASE_URL' || key === 'VITE_SUPABASE_URL') {
              url = val;
            }
            if (key === 'SUPABASE_ANON_KEY' || key === 'NEXT_PUBLIC_SUPABASE_ANON_KEY' || key === 'VITE_SUPABASE_PUBLISHABLE_KEY') {
              anonKey = val;
            }
          }
        });
        console.log('Successfully loaded Supabase credentials from local .env');
      }
    } catch (e) {
      console.warn('Could not load .env file, utilizing default server connections:', e);
    }
  }

  // Initialize client if script is loaded
  if (window.supabase) {
    try {
      dbClient = window.supabase.createClient(url, anonKey);
      console.log('Supabase client initialized successfully');
    } catch (e) {
      console.error('Supabase initialization failed:', e);
    }
  }
}
