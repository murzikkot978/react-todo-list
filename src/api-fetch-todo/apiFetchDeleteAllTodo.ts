async function apiFetchDeleteAllTodo(): Promise<void> {
  const response = await fetch(`https://api.todos.in.jt-lab.ch/todos`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error("I can't delete all todos");
  }
}

export default apiFetchDeleteAllTodo;
