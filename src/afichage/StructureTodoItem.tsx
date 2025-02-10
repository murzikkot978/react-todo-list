import { Todo } from '../models/Todo.ts';

function StructureTodoItem({ todo }: { todo: Todo }) {
  return (
    <ul className="ulTodoPartie">
      <li className="liElementTodo">
        <p>{todo.title + '---'}</p>
        <p>{todo.content}</p>
      </li>
      <li className="liElementDateChekDelet">
        <input type="checkbox" checked={todo.done} />
        <p>{todo.due_date.toISOString().slice(0, 10)}</p>
        <button className="buttonDelete">delete</button>
      </li>
    </ul>
  );
}

export default StructureTodoItem;
