import React, { useState } from 'react';
import apiFetchPost from '../api-fetch-todo/apiFetchPost.ts';
import apiFetchDeleteAllTodo from '../api-fetch-todo/apiFetchDeleteAllTodo.ts';
import { useToasts } from '../test/ErrorContext.tsx';
import { useTodoStorage } from '../zustand.ts';

function InputPartie() {
  const addTodos = useTodoStorage((state) => state.addTodos);
  const deleteAllTodo = useTodoStorage((state) => state.deleteAllTodo);
  const updateSortingMethod = useTodoStorage(
    (state) => state.updateSortingMethod,
  );

  const [status, setStatus] = useState('typing');
  const [todoInput, setTodoInput] = useState('');
  const [todoDate, setTodoDate] = useState('');
  const context = useToasts();

  async function handleSubmit() {
    setStatus('submitting');
    try {
      const newTodo = await apiFetchPost(todoInput, todoDate);
      console.log(newTodo);
      addTodos([newTodo]);
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

        <select className="dropdown-toggle">
          <option onClick={() => updateSortingMethod('')}>All</option>
          <option onClick={() => updateSortingMethod('done')}>Done</option>
          <option onClick={() => updateSortingMethod('undone')}>Undone</option>
          <option onClick={() => updateSortingMethod('minToMax')}>
            Sort min to max
          </option>
          <option onClick={() => updateSortingMethod('maxToMin')}>
            Sort max to min
          </option>
          <option onClick={() => updateSortingMethod('name')}>
            Sort by name
          </option>
        </select>
      </div>
    </>
  );
}

export default InputPartie;
