import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const path = searchParams.get('path') || '/events';

  if (!process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ ok: false, error: 'Missing REVALIDATE_TOKEN' }, { status: 500 });
  }
  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ ok: false, error: 'Invalid token' }, { status: 401 });
  }

  revalidatePath(path);
  return NextResponse.json({ ok: true, revalidated: path });
}
