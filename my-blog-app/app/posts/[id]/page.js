import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton';
import CommentForm from '@/components/CommentForm';
import CommentItem from '@/components/CommentItem';

export default async function PostDetailPage({ params }) {
  const { id } = await params;
  const posts = db.getPosts();
  const post = posts.find((p) => String(p.id) === String(id));
  if (!post) notFound();

  const session = await getSession();
  const comments = db.getComments().filter((c) => String(c.postId) === String(id));
  const isOwner = session && String(session.id) === String(post.userId);

  return (
    <div className="stack">
      <Link href="/posts" className="link-button" style={{ width: 'fit-content' }}>← Back to posts</Link>

      <article className="section-panel hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Post #{post.id}</p>
            <h1>{post.title}</h1>
            <p className="lede content-copy">{post.body}</p>
          </div>
          <div className="hero-card">
            <p className="section-title" style={{ fontSize: '1.3rem', marginBottom: 10 }}>Post details</p>
            <ul className="stat-list">
              <li>Author id: {post.userId}</li>
              <li>Comments: {comments.length}</li>
              <li>Status: {isOwner ? 'You can edit and delete this post' : 'Read only for this account'}</li>
            </ul>
            {isOwner && (
              <div className="inline-actions" style={{ marginTop: 16 }}>
                <Link href={`/posts/${post.id}/edit`} className="button button-secondary">Edit</Link>
                <DeleteButton url={`/api/posts/${post.id}`} redirectTo="/posts" />
              </div>
            )}
          </div>
        </div>
      </article>

      <section className="comments-card">
        <h2 className="section-title" style={{ fontSize: '1.75rem' }}>Comments ({comments.length})</h2>

        {session ? (
          <div className="section-panel" style={{ marginTop: 18 }}>
            <CommentForm postId={post.id} />
          </div>
        ) : (
          <p className="empty-state"><Link href="/login" className="link-button" style={{ display: 'inline-flex' }}>Log in</Link> to comment.</p>
        )}

        <ul className="comment-list">
          {comments.map((c) => (
            <CommentItem key={c.id} comment={c} currentUserId={session?.id} />
          ))}
        </ul>
      </section>
    </div>
  );
}
