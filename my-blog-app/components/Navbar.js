import Link from 'next/link';
import { getSession } from '@/lib/session';
import LogoutButton from './LogoutButton';

export default async function Navbar() {
  const session = await getSession();

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: 15, borderBottom: '1px solid #ddd' }}>
      <Link href="/posts">My Blog</Link>
      <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
        {session ? (
          <>
            <span>Hi, {session.name}</span>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/login">Log In</Link>
            <Link href="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
