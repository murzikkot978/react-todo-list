async function apiFetchPatchChangeDate(id: number, newDate: string) {
  const response = await fetch(
    `https://api.todos.in.jt-lab.ch/todos?id=eq.${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ due_date: newDate }),
    },
  );
  if (!response.ok) {
    throw new Error(
      'Cannot change title with apiFetchPatchChangeDate' + response.statusText,
    );
  }
}

export default apiFetchPatchChangeDate;
