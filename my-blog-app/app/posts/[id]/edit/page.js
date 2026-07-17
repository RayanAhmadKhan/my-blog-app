import { getSession } from '@/lib/session';
import { db } from '@/lib/db';
import { redirect, notFound } from 'next/navigation';
import PostForm from '@/components/PostForm';

export default async function EditPostPage({ params }) {
  const session = await getSession();
  if (!session) redirect('/login');

  const post = db.getPosts().find((p) => String(p.id) === String(params.id));
  if (!post) notFound();
  if (String(post.userId) !== String(session.id)) redirect(`/posts/${post.id}`);

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
      <h1>Edit Post</h1>
      <PostForm initialTitle={post.title} initialBody={post.body} postId={post.id} />
    </div>
  );
}