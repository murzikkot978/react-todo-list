import { Todo } from '../models/Todo.ts';

async function apiFetchPost(title: string, due_date: string) {
  const response = await fetch('https://api.todos.in.jt-lab.ch/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      Accept: 'application/vnd.pgrst.object+json',
    },
    body: JSON.stringify({ title, due_date }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return (await response.json()) as Todo;
}

export default apiFetchPost;
