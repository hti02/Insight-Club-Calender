// ── CONFIG ──────────────────────────────────────────────────────────────────
// Public Supabase credentials — safe to expose in client-side code,
// access is controlled by Row Level Security policies on the database.

const SUPABASE_URL = 'https://offyngqyjfrqhyheximn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_w0qmCIplrSoeXsmo5qbIfw_Z4a0YFl-';

// Shared edit passcode (not a real auth system — just a soft gate for
// trusted club members to enter edit mode on a shared device/browser)
const EDIT_PASSCODE = 'InsightClub2627';
