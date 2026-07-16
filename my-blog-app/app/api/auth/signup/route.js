import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sessionCookieOptions } from '@/lib/session';

export async function POST(request) 
{
  const { name, email, password } = await request.json();

  if (!name || !email || !password) 
  {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 }); // client side error
  }

  const users = db.getUsers();
  const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 409 }); // conflict error
  }

  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  db.saveUsers(users);

  const response = NextResponse.json({ message: 'Account created' });
  const opts = sessionCookieOptions();
  response.cookies.set(opts.name, String(newUser.id), opts);
  return response;
}
