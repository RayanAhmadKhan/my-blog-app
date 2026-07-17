'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CommentForm({ postId }) {
  const [body, setBody] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!body.trim()) return;
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, body }),
    });
    setBody('');
    router.refresh();
  }

  return 
  (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write a comment..."
        rows={3}
        style={{ width: '100%' }}
      />
      <button type="submit">Post comment</button>
    </form>
  );
}
