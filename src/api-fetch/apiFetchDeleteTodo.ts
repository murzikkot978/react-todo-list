async function apiFetchDeleteTodo(id: number) {
  fetch(`https://api.todos.in.jt-lab.ch/todos?id=eq.${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default apiFetchDeleteTodo;
