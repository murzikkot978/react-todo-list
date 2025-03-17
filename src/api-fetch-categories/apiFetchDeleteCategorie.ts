async function apiFetchDeleteCategories(id: number) {
  const response = await fetch(
    `https://api.todos.in.jt-lab.ch/categories?id=eq.${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (!response.ok) {
    throw new Error("I can't delete your categorie" + response.statusText);
  }
}

export default apiFetchDeleteCategories;
