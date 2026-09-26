import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { laptops } from '@/data/laptops';

export async function GET(request: Request) {
  // Ambil secret key dari URL parameter (?secret=...)
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  // Validasi kunci (lu bisa ganti 'koderahasia123' sesuai selera)
  if (secret !== 'koderahasia123') {
    return NextResponse.json(
      { error: 'Unauthorized. Dilarang masuk bos!' }, 
      { status: 401 }
    );
  }

  try {
    const { data, error } = await supabase.from('laptops').upsert(laptops);

    if (error) {
      console.error('Error seeding data:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Migrasi Selesai!', 
      successCount: laptops.length, 
      errors: [] 
    });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
