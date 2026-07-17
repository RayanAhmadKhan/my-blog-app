import Link from 'next/link';
import { getSession } from '@/lib/session';
import LogoutButton from './LogoutButton';

export default async function Navbar() {
  const session = await getSession();

  return (
    <nav className="surface topbar">
      <Link href="/posts" className="brand">Blog Journal</Link>
      <div className="nav-actions">
        {session ? (
          <>
            <span className="nav-greeting">Hi, {session.name}</span>
            <Link href="/posts/new" className="button button-secondary">New Post</Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/login" className="button button-secondary">Log In</Link>
            <Link href="/signup" className="button button-primary">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
