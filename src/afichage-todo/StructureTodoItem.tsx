import apiFetchDeleteTodo from '../api-fetch-todo/apiFetchDeleteTodo.ts';
import { Todo } from '../models/Todo.ts';
import apiFetchPatchStatusTodo from '../api-fetch-todo/apiFetchPatchStatusTodo.ts';
import apiFetchPatchChangeTitle from '../api-fetch-todo/apiFetchPatchChangeTitle.ts';
import apiFetchPatchChangeDate from '../api-fetch-todo/apiFetchPatchChangeDate.ts';
import { useToasts } from '../test/ErrorContext.tsx';
import React, { useEffect, useState } from 'react';
import { useCategoriesStorage, useTodoStorage } from '../zustand.ts';
import { categoriesForTodo } from '../api-fetch-todo/apiCategoriesTodos.ts';

interface TodoPartieProps {
  todo: Todo;
}

function StructureTodoItem({ todo }: TodoPartieProps) {
  const deleteTodo = useTodoStorage((state) => state.deleteTodo);
  const updateTitle = useTodoStorage((state) => state.updateTitle);
  const updateDate = useTodoStorage((state) => state.updateDate);
  const updateStatus = useTodoStorage((state) => state.updateStatus);
  const categories = useCategoriesStorage((state) => state.categories);
  const todos = useTodoStorage((state) => state.todos);
  const todoDate = new Date(todo.due_date);
  const context = useToasts();

  const today = new Date();
  const afterfordays = new Date();
  afterfordays.setDate(afterfordays.getDate() + 4);

  let colorTodo: string;
  if (todoDate.toISOString().slice(0, 10) < today.toISOString().slice(0, 10)) {
    colorTodo = 'red';
  } else if (
    todoDate.toISOString().slice(0, 10) === today.toISOString().slice(0, 10)
  ) {
    colorTodo = 'orange';
  } else if (todoDate > today && todoDate < afterfordays) {
    colorTodo = 'yellow';
  } else {
    colorTodo = 'green';
  }

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
      updateStatus(todo, newStatus);
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
      updateTitle(todo, newTitle);
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
      updateDate(todo, newDate);
    } catch (error) {
      console.error('Cannot change date', error);
      context.pushToast('Cannot change date');
    } finally {
      setEditingDate(false);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTodoCategories() {
      const todoData = todos.find((item: Todo) => item.id === todo.id);

      if (todoData?.categories && todoData.categories[0]) {
        setSelectedCategory(todoData.categories[0].id.toString());
      } else {
        setSelectedCategory('');
      }
    }

    fetchTodoCategories();
  }, [todo.id, todos]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    categoriesForTodo(categoryId, todo.id);
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
        <select value={selectedCategory || ''} onChange={handleCategoryChange}>
          <option value="">---chose category---</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
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
          <p style={{ color: colorTodo }} onClick={() => setEditingDate(true)}>
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
