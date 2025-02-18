import { Todo } from '../models/Todo.ts';

async function apiFetchGet() {
  const response = await fetch('https://api.todos.in.jt-lab.ch/todos');
  const todos = (await response.json()) as Todo[];
  if (!response.ok) {
    throw new Error('I cannot get todos' + response.statusText);
  }
  return todos;
}

export default apiFetchGet;
