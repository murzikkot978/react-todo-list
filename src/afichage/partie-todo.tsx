import { Todo } from '../models/Todo.ts';
import StructureTodoItem from './StructureTodoItem.tsx';

const todos = [
  {
    id: 1,
    title: 'bonjour',
    content: 'Bonjour',
    due_date: new Date(),
    done: true,
  },
  {
    id: 2,
    title: 'hi',
    content: 'Hi',
    due_date: new Date(),
    done: false,
  },
] satisfies Todo[];

function TodoPart() {
  return (
    <div className="divUlTodoPart">
      {todos.map((t) => (
        <StructureTodoItem key={t.id} todo={t} />
      ))}
    </div>
  );
}

export default TodoPart;
