//reading and writing data to json files in the data directory

import fs from 'fs';               //importing file systelm module to read and write files
import path from 'path';           //importing path module to handle file paths

const dataDir = path.join(process.cwd(), 'data');

function readJSON(file) {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, 'utf-8');
  return raw ? JSON.parse(raw) : [];
}

function writeJSON(file, data) {
  const filePath = path.join(dataDir, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export const db = {
  getUsers: () => readJSON('users.json'),
  saveUsers: (data) => writeJSON('users.json', data),
  getPosts: () => readJSON('posts.json'),
  savePosts: (data) => writeJSON('posts.json', data),
  getComments: () => readJSON('comments.json'),
  saveComments: (data) => writeJSON('comments.json', data),
};

