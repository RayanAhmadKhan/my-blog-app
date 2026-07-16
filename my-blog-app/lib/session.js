//for authentication and session management

import { cookies } from 'next/headers';
import { db } from './db';

const COOKIE_NAME = 'session_user_id';

export async function getSession() {
  const cookieStore = await cookies();
  const id = cookieStore.get(COOKIE_NAME)?.value;
  if (!id) return null;

  const users = db.getUsers();
  const user = users.find((u) => String(u.id) === String(id));
  if (!user) return null;

  const { password, ...safeUser } = user; // never leak the password to the client
  return safeUser;
}

export function sessionCookieOptions() {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  };
}
