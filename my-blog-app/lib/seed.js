import { db } from './db';

export async function ensureSeeded() {
  const existingPosts = db.getPosts();
  if (existingPosts.length > 0) return;

  const users = [
    { id: 1, name: 'Leanne Graham', email: 'leanne@example.com', password: 'password123' },
    { id: 2, name: 'Ervin Howell', email: 'ervin@example.com', password: 'password123' },
    { id: 3, name: 'Clementine Bauch', email: 'clementine@example.com', password: 'password123' },
    { id: 4, name: 'Patricia Lebsack', email: 'patricia@example.com', password: 'password123' },
    { id: 5, name: 'Chelsey Dietrich', email: 'chelsey@example.com', password: 'password123' },
    { id: 6, name: 'Mrs. Dennis Schulist', email: 'dennis@example.com', password: 'password123' },
    { id: 7, name: 'Kurtis Weissnat', email: 'kurtis@example.com', password: 'password123' },
    { id: 8, name: 'Nicholas Runolfsdottir', email: 'nicholas@example.com', password: 'password123' },
  ];
  db.saveUsers(users);

  const posts = [
    { id: 1, userId: 1, title: 'Welcome to the demo blog', body: 'This demo keeps the content short and readable so testing stays fast. Open a post, edit it, and try the comment form.' },
    { id: 2, userId: 1, title: 'Building clean forms', body: 'Clear labels, simple buttons, and direct feedback make forms easier to test. This post is a good place to try the login and signup screens.' },
    { id: 3, userId: 2, title: 'Why reusable components matter', body: 'Reusable components keep the codebase smaller and easier to understand. They also make UI changes faster when you want to improve the whole app.' },
    { id: 4, userId: 2, title: 'Saving data to JSON files', body: 'The app stores users, posts, and comments in local JSON files. That makes it very easy to inspect and reset while testing.' },
    { id: 5, userId: 3, title: 'Editing posts without confusion', body: 'The edit screen should show the current title and body clearly. That way you can verify updates with only a few clicks.' },
    { id: 6, userId: 3, title: 'Protecting owner-only actions', body: 'Only the owner should see edit and delete actions. This post is useful for checking authorization rules.' },
    { id: 7, userId: 4, title: 'Styling a simple blog app', body: 'A better background, more spacing, and stronger buttons can make the app feel much easier to use. This update focuses on readability and structure.' },
    { id: 8, userId: 4, title: 'Keeping comments easy to test', body: 'Short comments with clear names are much easier to review than noisy placeholder text. This helps when you are testing create, edit, and delete flows.' },
  ];
  db.savePosts(posts);

  const comments = [
    { id: '1-1', postId: 1, userId: null, name: 'Ava Brooks', email: 'ava@example.com', body: 'This version is much easier to test.' },
    { id: '1-2', postId: 1, userId: null, name: 'Noah Miller', email: 'noah@example.com', body: 'The post cards look clearer now.' },
    { id: '2-1', postId: 2, userId: null, name: 'Mia Carter', email: 'mia@example.com', body: 'The form layout feels much cleaner.' },
    { id: '2-2', postId: 2, userId: null, name: 'Liam Stone', email: 'liam@example.com', body: 'Great place to test validation messages.' },
    { id: '3-1', postId: 3, userId: null, name: 'Sophia Reed', email: 'sophia@example.com', body: 'Reusable components make this app easier to maintain.' },
    { id: '3-2', postId: 3, userId: null, name: 'Ethan Cole', email: 'ethan@example.com', body: 'I can follow the UI flow much faster now.' },
    { id: '4-1', postId: 4, userId: null, name: 'Olivia Turner', email: 'olivia@example.com', body: 'The local JSON setup is simple to inspect.' },
    { id: '4-2', postId: 4, userId: null, name: 'Lucas Green', email: 'lucas@example.com', body: 'Perfect for quick testing in a small project.' },
    { id: '5-1', postId: 5, userId: null, name: 'Amelia Ward', email: 'amelia@example.com', body: 'The edit screen should be easy to verify.' },
    { id: '5-2', postId: 5, userId: null, name: 'James Scott', email: 'james@example.com', body: 'Simple text makes debugging a lot faster.' },
    { id: '6-1', postId: 6, userId: null, name: 'Harper Bell', email: 'harper@example.com', body: 'Good to see owner-only actions protected.' },
    { id: '6-2', postId: 6, userId: null, name: 'Benjamin Hall', email: 'benjamin@example.com', body: 'This is a helpful check for permissions.' },
    { id: '7-1', postId: 7, userId: null, name: 'Ella Price', email: 'ella@example.com', body: 'The new look feels much more polished.' },
    { id: '7-2', postId: 7, userId: null, name: 'Henry Adams', email: 'henry@example.com', body: 'Much easier to scan and test now.' },
    { id: '8-1', postId: 8, userId: null, name: 'Grace Foster', email: 'grace@example.com', body: 'Short comments are definitely easier to review.' },
    { id: '8-2', postId: 8, userId: null, name: 'Jack White', email: 'jack@example.com', body: 'This is the best post for testing comment flows.' },
  ];
  db.saveComments(comments);
}
