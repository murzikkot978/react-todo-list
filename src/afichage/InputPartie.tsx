import React, { useState } from 'react';
import apiFetchPost from '../api-fetch/apiFetchPost.ts';
import apiFetchDeleteAllTodo from '../api-fetch/apiFetchDeleteAllTodo.ts';
import { Todo } from '../models/Todo.ts';
import sortMinToMaxDate from '../sorting/sortMinToMaxDate.ts';
import sortMaxToMinDate from '../sorting/sortMaxToMinDate.ts';
import sortByName from '../sorting/sortByName.ts';

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
  const [error, setError] = useState('');

  async function handleSubmit() {
    setStatus('submitting');
    try {
      const newTodo = await apiFetchPost(todoInput, todoDate);
      console.log(newTodo);
      addTodo(newTodo);
      setStatus('success');
      setError('');
    } catch (err: unknown) {
      console.log(err);
      setStatus('typing');
      setError('Cannot add todo');
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
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to delete all todos');
    }
  };

  const sortingByDateMinToMax = () => {
    try {
      const nextList = [...todos];
      sortMinToMaxDate(nextList);
      sorting(nextList);
    } catch (error) {
      console.error(error);
    }
  };

  const sortingByDateMaxToMin = () => {
    try {
      const nextList = [...todos];
      sortMaxToMinDate(nextList);
      sorting(nextList);
    } catch (error) {
      console.error(error);
    }
  };

  const sortingByName = async () => {
    try {
      const nextList = [...todos];
      sortByName(nextList);
      sorting(nextList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={sortingByDateMinToMax}>Sort min to max</button>
      <button onClick={sortingByDateMaxToMin}>Sort max to min</button>
      <button onClick={sortingByName}>Sort by name</button>
      <button onClick={() => statusDoneUndone('done')}>Done</button>
      <button onClick={() => statusDoneUndone('undone')}>Undone</button>
      <button onClick={() => statusDoneUndone('')}>All</button>
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
      <button onClick={handleDeleteAllTodo} className="deleteAll">
        Delete all
      </button>
      {error.length > 0 && <p className="error">{error}</p>}
    </>
  );
}

export default InputPartie;
