import { Todo } from '../models/Todo.ts';

function sortByName(todos: Todo[]) {
  todos.sort((a, b) => a.title.localeCompare(b.title));
}

export default sortByName;
