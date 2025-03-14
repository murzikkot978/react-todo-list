import { Categories } from '../models/Categories.ts';

async function apiFetchGetCategories() {
  const response = await fetch('https://api.todos.in.jt-lab.ch/categories');
  const categories = (await response.json()) as Categories[];
  if (!response.ok) {
    throw new Error('I cannot get todos' + response.statusText);
  }
  return categories;
}

export default apiFetchGetCategories;
