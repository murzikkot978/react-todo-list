import { Todo } from '../models/Todo.ts';

async function apiFetchGetTodo() {
  const response = await fetch(
    'https://api.todos.in.jt-lab.ch/todos?select=*,categories(id)',
  );
  const todos = (await response.json()) as Todo[];
  if (!response.ok) {
    throw new Error('I cannot get todos' + response.statusText);
  }
  return todos;
}

export default apiFetchGetTodo;
