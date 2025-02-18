async function apiFetchDeleteAllTodo(): Promise<void> {
  fetch(`https://api.todos.in.jt-lab.ch/todos`, {
    method: 'DELETE',
  });
}

export default apiFetchDeleteAllTodo;
