import StructureTodoItem from './StructureTodoItem.tsx';
import { Todo } from '../models/Todo.ts';
import { useTodoStorage } from '../zustand.ts';
import sortByName from '../sorting/sortByName.ts';
import sortMinToMaxDate from '../sorting/sortMinToMaxDate.ts';
import sortMaxToMinDate from '../sorting/sortMaxToMinDate.ts';

function TodoPartie() {
  const todos = useTodoStorage((state) => state.todos);
  const sortingMethod = useTodoStorage((state) => state.sortingMethod);

  console.log(todos);

  const sorting = (todos: Todo[]): Todo[] => {
    if (sortingMethod === 'minToMax') {
      return sortMinToMaxDate([...todos]);
    } else if (sortingMethod === 'maxToMin') {
      const nextList = [...todos];
      return sortMaxToMinDate(nextList);
    } else if (sortingMethod === 'name') {
      const nextList = [...todos];
      return sortByName(nextList);
    } else if (sortingMethod === 'done') {
      const nextList = todos.filter((t) => t.done);
      return nextList;
    } else if (sortingMethod === 'undone') {
      const nextList = todos.filter((t) => !t.done);
      return nextList;
    } else {
      const nextList = todos;
      return nextList;
    }
  };

  console.log(todos);
  return (
    <div className="divUlTodoPart">
      {sorting(todos).map((t: Todo) => (
        <StructureTodoItem key={t.id} todo={t} />
      ))}
    </div>
  );
}

export default TodoPartie;
