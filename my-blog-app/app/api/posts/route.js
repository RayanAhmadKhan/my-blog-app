
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function GET() {
  return NextResponse.json({ posts: db.getPosts() });
}

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'You must be logged in' }, { status: 401 }); // Unauthorized
  }

  const { title, body } = await request.json();
  if (!title || !body) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 }); // Bad Request
  }

  const posts = db.getPosts();
  const newPost = { id: Date.now(), userId: session.id, title, body };
  posts.unshift(newPost);
  db.savePosts(posts);

  return NextResponse.json({ post: newPost });
}
