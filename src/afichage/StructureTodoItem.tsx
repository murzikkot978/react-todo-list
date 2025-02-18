import apiFetchDeleteTodo from '../api-fetch/apiFetchDeleteTodo.ts';
import { Todo } from '../models/Todo.ts';
import apiFetchPatchStatusTodo from '../api-fetch/apiFetchPatchStatusTodo.ts';
import apiFetchPatchChangeTitle from '../api-fetch/apiFetchPatchChangeTitle.ts';
import apiFetchPatchChangeDate from '../api-fetch/apiFetchPatchChangeDate.ts';

export interface TodoPartieProps {
  todo: Todo;
  deleteTodo: (todo: Todo) => void;
  changeTitle: (todo: Todo, newTotle: string) => void;
  changeDate: (todo: Todo, newDate: string) => void;
}

function StructureTodoItem({
  todo,
  deleteTodo,
  changeTitle,
  changeDate,
}: TodoPartieProps) {
  const todoDate = new Date(todo.due_date);
  const handleDelete = async () => {
    try {
      await apiFetchDeleteTodo(todo.id);
      deleteTodo(todo);
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  };
  const handleCangeStatus = async () => {
    try {
      await apiFetchPatchStatusTodo(todo);
    } catch (error) {
      console.error('Cannot change status of todo', error);
    }
  };
  const handleChangeTitle = async () => {
    const newTitle = prompt('Enter your new title here:');
    if (newTitle) {
      try {
        await apiFetchPatchChangeTitle(todo.id, newTitle);
        changeTitle(todo, newTitle);
      } catch (error) {
        console.error('Cannot change title', error);
      }
    }
  };
  const handleChangeDate = async () => {
    const newDate = prompt('Enter your new date here (YYYY-MM-DD):');
    if (newDate) {
      try {
        await apiFetchPatchChangeDate(todo.id, newDate);
        changeDate(todo, newDate);
      } catch (error) {
        console.error('Cannot change date', error);
      }
    }
  };
  return (
    <ul className="ulTodoPartie">
      <li className="liElementTodo">
        <p onClick={handleChangeTitle}>{todo.title}</p>
        <p>{todo.content}</p>
      </li>
      <li className="liElementDateChekDelet">
        <input
          onClick={handleCangeStatus}
          type="checkbox"
          defaultChecked={todo.done}
        />
        <p onClick={handleChangeDate}>{todoDate.toISOString().slice(0, 10)}</p>
        <button onClick={handleDelete} className="buttonDelete">
          delete
        </button>
      </li>
    </ul>
  );
}

export default StructureTodoItem;
