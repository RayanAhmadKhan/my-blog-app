import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import PostForm from '@/components/PostForm';

export default async function NewPostPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  return (
    <div className="stack">
      <div className="section-panel hero">
        <p className="eyebrow">Create content</p>
        <h1>New Post</h1>
        <p className="lede">Write a short, test-friendly post and publish it to the demo blog.</p>
      </div>
      <div className="editor-card">
      <PostForm />
      </div>
    </div>
  );
}
