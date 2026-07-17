import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import PostForm from '@/components/PostForm';

export default async function NewPostPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
      <h1>New Post</h1>
      <PostForm />
    </div>
  );
}
