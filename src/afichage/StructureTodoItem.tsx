import apiFetchDeleteTodo from '../api-fetch/apiFetchDeleteTodo.ts';
import { Todo } from '../models/Todo.ts';

export interface TodoPartieProps {
  todo: Todo;
  deleteTodo: (todo: Todo) => void;
}

function StructureTodoItem({ todo, deleteTodo }: TodoPartieProps) {
  const todoDate = new Date(todo.due_date);
  const handleDelete = async () => {
    try {
      await apiFetchDeleteTodo(todo.id);
      deleteTodo(todo);
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  };
  return (
    <ul className="ulTodoPartie">
      <li className="liElementTodo">
        <p>{todo.title}</p>
        <p>{todo.content}</p>
      </li>
      <li className="liElementDateChekDelet">
        <input type="checkbox" defaultChecked={todo.done} />
        <p>{todoDate.toISOString().slice(0, 10)}</p>
        <button onClick={handleDelete} className="buttonDelete">
          delete
        </button>
      </li>
    </ul>
  );
}

export default StructureTodoItem;
