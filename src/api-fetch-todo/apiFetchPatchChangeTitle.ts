async function apiFetchPatchChangeTitle(id: number, newTitle: string) {
  const response = await fetch(
    `https://api.todos.in.jt-lab.ch/todos?id=eq.${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
        Accept: 'application/vnd.pgrst.object+json',
      },
      body: JSON.stringify({ title: newTitle }),
    },
  );
  if (!response.ok) {
    throw new Error(
      'Cannot change title with apiFetchPatchChangeTitle' + response.statusText,
    );
  }
}

export default apiFetchPatchChangeTitle;
