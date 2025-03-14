async function apiFetchPostCategories(title: string, color: string) {
  const response = await fetch('https://api.todos.in.jt-lab.ch/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      Accept: 'application/vnd.pgrst.object+json',
    },
    body: JSON.stringify({ title, color }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export default apiFetchPostCategories;
