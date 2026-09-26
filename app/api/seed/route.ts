import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { laptops } from '../../../data/laptops';

export async function GET() {
  let successCount = 0;
  let errors = [];

  for (const laptop of laptops) {
    // Menggunakan upsert agar tidak terjadi error duplikat jika halaman di-refresh
    const { error } = await supabase.from('laptops').upsert({
      id: laptop.id,
      brand: laptop.brand,
      family: laptop.family || null,
      model: laptop.model,
      model_number: laptop.modelNumber || null,
      release_year: laptop.releaseYear,
      verification_status: laptop.verificationStatus,
      configurations: laptop.configurations,
      sources: laptop.sources || [],
      last_verified_at: laptop.lastVerifiedAt
    });

    if (error) {
      errors.push({ model: laptop.model, error });
    } else {
      successCount++;
    }
  }

  return NextResponse.json({
    message: "Migrasi Selesai!",
    successCount,
    errors
  });
}
