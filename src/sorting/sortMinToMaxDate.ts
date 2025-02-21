import { Todo } from '../models/Todo.ts';

function sortMinToMaxDate(todos: Todo[]) {
  todos.sort(
    (a, b) => new Date(a.due_date).getDate() - new Date(b.due_date).getDate(),
  );
  return todos;
}

export default sortMinToMaxDate;
