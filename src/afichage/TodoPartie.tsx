import StructureTodoItem from './StructureTodoItem.tsx';
import { Todo } from '../models/Todo.ts';

interface Props {
  todosTemporer: Todo[];
  deleteTodo: (todo: Todo) => void;
  changeTitle: (todo: Todo, newTitle: string) => void;
  changeDate: (todo: Todo, newDate: string) => void;
  changeStatus: (todo: Todo, newStatus: boolean) => void;
}

function TodoPartie({
  todosTemporer,
  deleteTodo,
  changeTitle,
  changeDate,
  changeStatus,
}: Props) {
  return (
    <div className="divUlTodoPart">
      {todosTemporer.map((t: Todo) => (
        <StructureTodoItem
          key={t.id}
          todo={t}
          deleteTodo={deleteTodo}
          changeTitle={changeTitle}
          changeDate={changeDate}
          changeStatus={changeStatus}
        />
      ))}
    </div>
  );
}

export default TodoPartie;
