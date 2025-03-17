async function apiFetchDeleteTodo(id: number) {
  const response = await fetch(
    `https://api.todos.in.jt-lab.ch/todos?id=eq.${id}`,
    {
      method: 'DELETE',
    },
  );
  if (!response.ok) {
    throw new Error("I can't delete your todo" + response.statusText);
  }
}

export default apiFetchDeleteTodo;
