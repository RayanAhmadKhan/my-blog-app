import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function GET(request, { params }) {   // read
  
  const posts = db.getPosts();
  const post = posts.find((p) => String(p.id) === String(params.id));
  
  if (!post) 
    return NextResponse.json({ error: 'Not found' }, { status: 404 }); // Not Found
  
  
  return NextResponse.json({ post });
}

export async function PUT(request, { params }) {  // update
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); // Unauthorized

  const posts = db.getPosts();
  const index = posts.findIndex((p) => String(p.id) === String(params.id));
  
  if (index === -1) 
    return NextResponse.json({ error: 'Not found' }, { status: 404 }); // Not Found


  if (String(posts[index].userId) !== String(session.id))
  {
    return NextResponse.json({ error: 'You can only edit your own posts' }, { status: 403 }); // Forbidden
  }

  const { title, body } = await request.json();
  posts[index] = { ...posts[index], title, body };
  db.savePosts(posts);
  
  return NextResponse.json({ post: posts[index] });
}

export async function DELETE(request, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); // Unauthorized

  const posts = db.getPosts();
  const post = posts.find((p) => String(p.id) === String(params.id));
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 }); // Not Found
  if (String(post.userId) !== String(session.id)) {
    return NextResponse.json({ error: 'You can only delete your own posts' }, { status: 403 }); // Forbidden
  }

  db.savePosts(posts.filter((p) => String(p.id) !== String(params.id)));
  db.saveComments(db.getComments().filter((c) => String(c.postId) !== String(params.id)));

  return NextResponse.json({ message: 'Deleted' });
}
