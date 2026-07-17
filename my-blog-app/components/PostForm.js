'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

//it is used for both creating and editing a post. If postId is provided, it is an edit form, otherwise it is a create form.

export default function PostForm({ initialTitle = '', initialBody = '', postId }) 
{
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [error, setError] = useState('');
  const router = useRouter();
  const isEdit = Boolean(postId);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');   
    const url = isEdit ? `/api/posts/${postId}` : '/api/posts';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Something went wrong');
      return;
    }
    router.push(`/posts/${isEdit ? postId : data.post.id}`);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 500 }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Content" rows={6} required />
      <button type="submit">{isEdit ? 'Save changes' : 'Create post'}</button>
    </form>
  );
}
