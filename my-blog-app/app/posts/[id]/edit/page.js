import { getSession } from '@/lib/session';
import { db } from '@/lib/db';
import { redirect, notFound } from 'next/navigation';
import PostForm from '@/components/PostForm';

export default async function EditPostPage({ params }) {
  const session = await getSession();
  if (!session) redirect('/login');

  const { id } = await params;
  const post = db.getPosts().find((p) => String(p.id) === String(id));
  if (!post) notFound();
  if (String(post.userId) !== String(session.id)) redirect(`/posts/${post.id}`);

  return (
    <div className="stack">
      <div className="section-panel hero">
        <p className="eyebrow">Update content</p>
        <h1>Edit Post</h1>
        <p className="lede">Make a small change and save it to test the edit flow end to end.</p>
      </div>
      <div className="editor-card">
      <PostForm initialTitle={post.title} initialBody={post.body} postId={post.id} />
      </div>
    </div>
  );
}