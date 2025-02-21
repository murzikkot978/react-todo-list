import { Todo } from '../models/Todo.ts';

function sortMaxToMinDate(todos: Todo[]) {
  todos.sort(
    (a, b) => new Date(b.due_date).getDate() - new Date(a.due_date).getDate(),
  );
  return todos;
}

export default sortMaxToMinDate;
