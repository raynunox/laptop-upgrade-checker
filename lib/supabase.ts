import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validasi ketat: Hentikan aplikasi jika env vars tidak ditemukan
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Koneksi Supabase Gagal: Pastikan NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY sudah diset di environment variables (.env)."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
