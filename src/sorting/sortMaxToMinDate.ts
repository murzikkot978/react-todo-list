import { Todo } from '../models/Todo.ts';

function sortMaxToMinDate(todos: Todo[]) {
  todos.sort(
    (a, b) => new Date(b.due_date).getTime() - new Date(a.due_date).getTime(),
  );
  return todos;
}

export default sortMaxToMinDate;
