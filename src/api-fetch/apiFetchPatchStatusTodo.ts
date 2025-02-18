import { Todo } from '../models/Todo.ts';

async function apiFetchPatchStatusTodo(todo: Todo) {
  const newStatus: boolean = !todo.done;
  const response = await fetch(
    `https://api.todos.in.jt-lab.ch/todos?id=eq.${todo.id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ done: newStatus }),
    },
  );
  if (!response.ok) {
    throw new Error(
      'Cannot change status with apiFetchPatchStatusTodo' + response.statusText,
    );
  }
}

export default apiFetchPatchStatusTodo;
