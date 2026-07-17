import Link from 'next/link';
import { db } from '@/lib/db';
import { ensureSeeded } from '@/lib/seed';
import { getSession } from '@/lib/session';

export default async function PostsPage() {
  await ensureSeeded();
  const posts = db.getPosts();
  const session = await getSession();

  return (
    <div className="section-panel hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Testing workspace</p>
          <h1>All Posts</h1>
          <p className="lede">Browse short, readable demo posts that make it easy to test navigation, editing, and comments without noisy placeholder text.</p>
        </div>
        <div className="hero-card">
          <p className="section-title" style={{ fontSize: '1.3rem', marginBottom: 10 }}>Quick actions</p>
          <ul className="stat-list">
            <li>{posts.length} readable posts</li>
            <li>{session ? 'Logged in and ready to create' : 'Log in to create or edit posts'}</li>
            <li>Click any card to open the detail view</li>
          </ul>
          {session && <div className="form-actions" style={{ marginTop: 16 }}><Link href="/posts/new" className="button button-primary">+ New Post</Link></div>}
        </div>
      </div>

      <div className="post-grid">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`} className="post-card">
            <div className="post-meta">Post #{post.id}</div>
            <div className="post-title">{post.title}</div>
            <p className="post-excerpt">{post.body.slice(0, 140)}{post.body.length > 140 ? '…' : ''}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
