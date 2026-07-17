import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function PUT(request, { params }) {        // update
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const comments = db.getComments();
  const index = comments.findIndex((c) => String(c.id) === String(id));
  
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  
  
  if (String(comments[index].userId) !== String(session.id)) 
  {
    return NextResponse.json({ error: 'You can only edit your own comments' }, { status: 403 });
  }

  const { body } = await request.json();
  comments[index] = { ...comments[index], body };
  db.saveComments(comments);
  return NextResponse.json({ comment: comments[index] });
}

export async function DELETE(request, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const comments = db.getComments();
  const comment = comments.find((c) => String(c.id) === String(id));
  if (!comment) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (String(comment.userId) !== String(session.id)) {
    return NextResponse.json({ error: 'You can only delete your own comments' }, { status: 403 });
  }

  db.saveComments(comments.filter((c) => String(c.id) !== String(id)));
  return NextResponse.json({ message: 'Deleted' });
}
