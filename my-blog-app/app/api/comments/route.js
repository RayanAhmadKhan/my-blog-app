import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function POST(request) {                      // create
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'You must be logged in to comment' }, { status: 401 });
  }

  const { postId, body } = await request.json();
  if (!body) return NextResponse.json({ error: 'Comment cannot be empty' }, { status: 400 });

  const comments = db.getComments();
  const newComment = {
    id: Date.now(),
    postId,
    userId: session.id,
    name: session.name,
    email: session.email,
    body,
  };
  comments.push(newComment);
  db.saveComments(comments);

  return NextResponse.json({ comment: newComment });
}
