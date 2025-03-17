async function apiFetchDeleteAllCategories(): Promise<void> {
  const response = await fetch(`https://api.todos.in.jt-lab.ch/categories`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error("I can't delete all categories");
  }
}

export default apiFetchDeleteAllCategories;
