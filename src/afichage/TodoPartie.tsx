import StructureTodoItem from './StructureTodoItem.tsx';
import { Todo } from '../models/Todo.ts';

interface Props {
  todos: Todo[];
  deleteTodo: (todo: Todo) => void;
}

function TodoPartie({ todos, deleteTodo }: Props) {
  return (
    <div className="divUlTodoPart">
      {todos.map((t: Todo) => (
        <StructureTodoItem key={t.id} todo={t} deleteTodo={deleteTodo} />
      ))}
    </div>
  );
}

export default TodoPartie;
