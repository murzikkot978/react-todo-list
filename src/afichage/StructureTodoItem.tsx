import apiFetchDeleteTodo from '../api-fetch/apiFetchDeleteTodo.ts';
import { Todo } from '../models/Todo.ts';
import apiFetchPatchStatusTodo from '../api-fetch/apiFetchPatchStatusTodo.ts';
import apiFetchPatchChangeTitle from '../api-fetch/apiFetchPatchChangeTitle.ts';
import apiFetchPatchChangeDate from '../api-fetch/apiFetchPatchChangeDate.ts';
import { useToasts } from '../test/ErrorContext.tsx';
import { useEffect, useState } from 'react';

export interface TodoPartieProps {
  todo: Todo;
  deleteTodo: (todo: Todo) => void;
  changeTitle: (todo: Todo, newTotle: string) => void;
  changeDate: (todo: Todo, newDate: string) => void;
  changeStatus: (todo: Todo, newStatus: boolean) => void;
}

function StructureTodoItem({
  todo,
  deleteTodo,
  changeTitle,
  changeDate,
  changeStatus,
}: TodoPartieProps) {
  const todoDate = new Date(todo.due_date);
  const context = useToasts();
  const handleDelete = async () => {
    try {
      await apiFetchDeleteTodo(todo.id);
      deleteTodo(todo);
    } catch (error) {
      console.error('Error deleting todo', error);
      context.pushToast('Error deleting todo');
    }
  };
  const handleCangeStatus = async () => {
    const newStatus: boolean = !todo.done;
    try {
      await apiFetchPatchStatusTodo(todo, newStatus);
      changeStatus(todo, newStatus);
    } catch (error) {
      console.error('Cannot change status of todo', error);
      context.pushToast('Cannot change status of todo');
    }
  };

  const [newTitle, setNewTitle] = useState(todo.title);
  const [editingTitle, setEditingTitle] = useState(false);
  useEffect(() => {
    if (!editingTitle) {
      setNewTitle(todo.title);
    }
  }, [todo.title, editingTitle]);
  const handleChangeTitle = async () => {
    if (!newTitle.trim()) {
      setEditingTitle(false);
      return;
    }

    try {
      await apiFetchPatchChangeTitle(todo.id, newTitle);
      changeTitle(todo, newTitle);
    } catch (error) {
      console.error('Cannot change title', error);
      context.pushToast('Cannot change title');
    } finally {
      setEditingTitle(false);
    }
  };

  const [newDate, setNewDate] = useState('');
  const [editingDate, setEditingDate] = useState(false);

  const handleChangeDate = async () => {
    if (!newDate) {
      setEditingDate(false);
      return;
    }

    try {
      await apiFetchPatchChangeDate(todo.id, newDate);
      changeDate(todo, newDate);
    } catch (error) {
      console.error('Cannot change date', error);
      context.pushToast('Cannot change date');
    } finally {
      setEditingDate(false);
    }
  };
  return (
    <ul className="ulTodoPartie">
      <li className="liElementTodo">
        {editingTitle ? (
          <input
            style={{ backgroundColor: 'transparent' }}
            type="text"
            value={newTitle}
            autoFocus
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleChangeTitle}
            onKeyDown={(e) => e.key === 'Enter' && handleChangeTitle()}
          />
        ) : (
          <p onClick={() => setEditingTitle(true)}>{todo.title}</p>
        )}
        <p>{todo.content}</p>
      </li>
      <li className="liElementDateChekDelet">
        <input
          onChange={handleCangeStatus}
          type="checkbox"
          checked={todo.done}
        />
        {editingDate ? (
          <input
            style={{ backgroundColor: 'transparent' }}
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            onBlur={handleChangeDate}
            onKeyDown={(e) => e.key === 'Enter' && handleChangeDate()}
          />
        ) : (
          <p onClick={() => setEditingDate(true)}>
            {todoDate.toISOString().slice(0, 10)}
          </p>
        )}
        <button onClick={handleDelete} className="buttonDelete">
          delete
        </button>
      </li>
    </ul>
  );
}

export default StructureTodoItem;
