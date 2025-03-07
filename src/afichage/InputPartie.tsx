import React, { useState } from 'react';
import apiFetchPost from '../api-fetch/apiFetchPost.ts';
import apiFetchDeleteAllTodo from '../api-fetch/apiFetchDeleteAllTodo.ts';
import { Todo } from '../models/Todo.ts';
import sortMinToMaxDate from '../sorting/sortMinToMaxDate.ts';
import sortMaxToMinDate from '../sorting/sortMaxToMinDate.ts';
import sortByName from '../sorting/sortByName.ts';
import { useToasts } from '../test/ErrorContext.tsx';

interface InputPartieProps {
  addTodo: (todo: Todo) => void;
  deleteAllTodo: () => void;
  todos: Todo[];
  sorting: (todo: Todo[]) => void;
  statusDoneUndone: (statusDoneUndone: string) => void;
}

function InputPartie({
  addTodo,
  deleteAllTodo,
  todos,
  sorting,
  statusDoneUndone,
}: InputPartieProps) {
  const [status, setStatus] = useState('typing');
  const [todoInput, setTodoInput] = useState('');
  const [todoDate, setTodoDate] = useState('');
  const context = useToasts();

  async function handleSubmit() {
    setStatus('submitting');
    try {
      const newTodo = await apiFetchPost(todoInput, todoDate);
      console.log(newTodo);
      addTodo(newTodo);
      setStatus('success');
      setTodoInput('');
      setTodoDate('');
    } catch (err: unknown) {
      console.log(err);
      setStatus('typing');
      context.pushToast('Can not add todo');
      context.pushToast('Write date');
    }
  }

  function handleInputTodoChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTodoInput(e.target.value);
  }

  function handleInputDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTodoDate(e.target.value);
  }

  const handleDeleteAllTodo = async () => {
    try {
      await apiFetchDeleteAllTodo();
      deleteAllTodo();
    } catch (err) {
      console.error(err);
      context.pushToast('Can not delete todos');
    }
  };

  const sortingByDateMinToMax = () => {
    const nextList = [...todos];
    sortMinToMaxDate(nextList);
    sorting(nextList);
  };

  const sortingByDateMaxToMin = () => {
    const nextList = [...todos];
    sortMaxToMinDate(nextList);
    sorting(nextList);
  };

  const sortingByName = async () => {
    const nextList = [...todos];
    sortByName(nextList);
    sorting(nextList);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <form className="divInputPartie">
        <input
          value={todoInput}
          onChange={handleInputTodoChange}
          disabled={status === 'submitting'}
          className="inputTodo"
          type="text"
        />
        <input
          value={todoDate}
          onChange={handleInputDateChange}
          className="inputDate"
          type="date"
        />
        <button
          onClick={() => handleSubmit()}
          disabled={todoInput.length === 0 || status === 'submitting'}
          className="addTodo"
        >
          addTodo
        </button>
      </form>
      <div className="divButtonDeleteAndSorting">
        <button onClick={handleDeleteAllTodo} className="deleteAll">
          Delete all
        </button>
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="dropdown-toggle"
          >
            Sorting Options ▼
          </button>

          {isOpen && (
            <div className="dropdown-list">
              <button onClick={sortingByDateMinToMax}>Sort min to max</button>
              <button onClick={sortingByDateMaxToMin}>Sort max to min</button>
              <button onClick={sortingByName}>Sort by name</button>
              <button onClick={() => statusDoneUndone('done')}>Done</button>
              <button onClick={() => statusDoneUndone('undone')}>Undone</button>
              <button onClick={() => statusDoneUndone('')}>All</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default InputPartie;
