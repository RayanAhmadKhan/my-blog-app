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

  return (
    <form onSubmit={handleSubmit} className="stack">
      <div className="form-group">
        <label className="field-label" htmlFor={`comment-${postId}`}>Add a comment</label>
        <textarea
          id={`comment-${postId}`}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a short comment to test the form"
          rows={4}
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="button button-primary">Post comment</button>
      </div>
    </form>
  );
}
