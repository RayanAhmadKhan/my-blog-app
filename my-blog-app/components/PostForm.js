'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// It is used for both creating and editing a post. If postId is provided, it is an edit form, otherwise it is a create form.

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
    <form onSubmit={handleSubmit} className="stack">
      {error && <p className="error-banner">{error}</p>}
      <div className="form-group">
        <label className="field-label" htmlFor="post-title">Title</label>
        <input id="post-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="A clear, test-friendly title" required />
      </div>
      <div className="form-group">
        <label className="field-label" htmlFor="post-body">Content</label>
        <textarea id="post-body" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write the post content here" rows={8} required />
      </div>
      <div className="form-actions">
        <button type="submit" className="button button-primary">{isEdit ? 'Save changes' : 'Create post'}</button>
      </div>
    </form>
  );
}
