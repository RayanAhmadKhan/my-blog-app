import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton';
import CommentForm from '@/components/CommentForm';
import CommentItem from '@/components/CommentItem';

export default async function PostDetailPage({ params }) {
  const { id } = params;
  const posts = db.getPosts();
  const post = posts.find((p) => String(p.id) === String(id));
  if (!post) notFound();

  const session = await getSession();
  const comments = db.getComments().filter((c) => String(c.postId) === String(id));
  const isOwner = session && String(session.id) === String(post.userId);

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
      <Link href="/posts">← Back to posts</Link>
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      {isOwner && (
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <Link href={`/posts/${post.id}/edit`}>Edit</Link>
          <DeleteButton url={`/api/posts/${post.id}`} redirectTo="/posts" />
        </div>
      )}

      <hr />
      <h2>Comments ({comments.length})</h2>

      {session ? (
        <CommentForm postId={post.id} />
      ) : (
        <p><Link href="/login">Log in</Link> to comment.</p>
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {comments.map((c) => (
          <CommentItem key={c.id} comment={c} currentUserId={session?.id} />
        ))}
      </ul>
    </div>
  );
}
