import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sessionCookieOptions } from '@/lib/session';

export async function POST(request) {
  const { email, password } = await request.json();
  const users = db.getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === (email || '').toLowerCase()
  );

  if (!user || user.password !== password) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 }); // unauthorized error
  } 

  const response = NextResponse.json({ message: 'Logged in' });
  const opts = sessionCookieOptions();
  response.cookies.set(opts.name, String(user.id), opts);
  return response;
}
