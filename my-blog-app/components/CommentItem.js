'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CommentItem({ comment, currentUserId }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [body, setBody] = useState(comment.body);
  const isOwner = currentUserId && String(currentUserId) === String(comment.userId);

  async function saveEdit() {
    await fetch(`/api/comments/${comment.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body }),
    });
    setEditing(false);
    router.refresh();
  }

  async function deleteComment() {
    if (!confirm('Delete this comment?')) return;
    await fetch(`/api/comments/${comment.id}`, { method: 'DELETE' });
    router.refresh();
  }

  return (
    <li style={{ border: '1px solid #ddd', padding: 10, marginBottom: 10, listStyle: 'none' }}>
      <strong>{comment.name}</strong>
      {editing ? (
        <div>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} style={{ width: '100%' }} />
          <button onClick={saveEdit}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <p>{comment.body}</p>
      )}
      {isOwner && !editing && (
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={deleteComment}>Delete</button>
        </div>
      )}
    </li>
  );
}
