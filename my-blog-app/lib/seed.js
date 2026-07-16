//initailizes the database with seed data if it's empty

import { db } from './db';

export async function ensureSeeded() {
  const existingPosts = db.getPosts();
  if (existingPosts.length > 0) return; // already seeded, do nothing
  
  
  //1. Users
  const usersRes = await fetch('https://jsonplaceholder.typicode.com/users');
  const usersData = await usersRes.json();
  const users = usersData.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    password: 'password123', // placeholder 
  }));
  db.saveUsers(users);

  // 2. Posts
  const postsRes = await fetch('https://jsonplaceholder.typicode.com/posts');
  const postsData = await postsRes.json();
  const posts = postsData.slice(0, 20).map((p) => ({
    id: p.id,
    userId: p.userId,
    title: p.title,
    body: p.body,
  }));
  db.savePosts(posts);

  // 3. Comments for each post
  let allComments = [];
  for (const post of posts) {
    const cRes = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
    );
    const cData = await cRes.json();
    const comments = cData.map((c) => ({
      id: `${post.id}-${c.id}`,
      postId: post.id,
      userId: null, // not owned by a real registered user , assumption 
      name: c.name,
      email: c.email,
      body: c.body,
    }));
    allComments = allComments.concat(comments);
  }
  db.saveComments(allComments);
}
