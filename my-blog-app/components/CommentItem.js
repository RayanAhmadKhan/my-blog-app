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
    <li className="comment-card">
      <div className="comment-header">
        <div>
          <p className="comment-author">{comment.name}</p>
          <p className="comment-meta">{comment.email}</p>
        </div>
      </div>
      {editing ? (
        <div className="stack">
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
          <div className="comment-actions">
            <button onClick={saveEdit} className="button button-primary">Save</button>
            <button onClick={() => setEditing(false)} className="button button-secondary">Cancel</button>
          </div>
        </div>
      ) : (
        <p className="comment-body">{comment.body}</p>
      )}
      {isOwner && !editing && (
        <div className="comment-actions">
          <button onClick={() => setEditing(true)} className="button button-secondary">Edit</button>
          <button onClick={deleteComment} className="button button-danger">Delete</button>
        </div>
      )}
    </li>
  );
}
