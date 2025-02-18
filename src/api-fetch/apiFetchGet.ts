import { Todo } from '../models/Todo.ts';

async function apiFetchGet() {
  const response = await fetch('https://api.todos.in.jt-lab.ch/todos');
  const todos = (await response.json()) as Todo[];
  return todos;
}

export default apiFetchGet;
