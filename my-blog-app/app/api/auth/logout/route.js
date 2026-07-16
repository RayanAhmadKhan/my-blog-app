import { NextResponse } from 'next/server';
import { sessionCookieOptions } from '@/lib/session';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });
  const opts = sessionCookieOptions();
  response.cookies.set(opts.name, '', { ...opts, maxAge: 0 });
  return response;
}
