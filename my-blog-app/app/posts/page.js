import Link from 'next/link';
import { db } from '@/lib/db';
import { ensureSeeded } from '@/lib/seed';
import { getSession } from '@/lib/session';

export default async function PostsPage() {
  await ensureSeeded();
  const posts = db.getPosts();
  const session = await getSession();

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>All Posts</h1>
        {session && <Link href="/posts/new">+ New Post</Link>}
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li key={post.id} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 10 }}>
            <Link href={`/posts/${post.id}`}><strong>{post.title}</strong></Link>
            <p>{post.body.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
