import { NextResponse } from 'next/server';

export async function GET() {
  const payload = {
    now: new Date().toISOString(),
    random: Math.random(),
  };
  return NextResponse.json(payload, { status: 200 });
}
