import './App.css';
import InputPartie from './afichage/InputPartie.tsx';
import TodoPartie from './afichage/TodoPartie.tsx';
import { useState, useEffect } from 'react';
import { Todo } from './models/Todo.ts';
import apiFetchGet from './api-fetch/apiFetchGet.ts';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [doneUdone, setDoneUdone] = useState('');

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const changeTitle = (todo: Todo, newTitle: string) => {
    console.log(todo);
    setTodos(
      todos.map((t) => (todo.id === t.id ? { ...t, title: newTitle } : t)),
    );
  };

  const changeDate = (todo: Todo, newDate: string) => {
    setTodos(
      todos.map((t) =>
        todo.id === t.id ? { ...t, due_date: new Date(newDate) } : t,
      ),
    );
  };

  const changeStatus = (todo: Todo, newStatus: boolean) => {
    setTodos(
      todos.map((t) => (todo.id === t.id ? { ...t, done: newStatus } : t)),
    );
  };

  const deleteTodo = (todo: Todo) => {
    setTodos(todos.filter((t) => t.id !== todo.id));
  };

  const deleteAllTodo = () => {
    setTodos([]);
  };

  const sorting = (todo: Todo[]) => {
    setTodos(todo);
  };

  const statusDoneUndone = (statusDoneUndone: string) => {
    setDoneUdone(statusDoneUndone);
  };

  useEffect(() => {
    apiFetchGet().then((todos) => setTodos(todos));
  }, []);

  function sortDoneUndone(todos: Todo[]) {
    if (doneUdone === 'done') {
      return todos.filter((t) => t.done);
    } else if (doneUdone === 'undone') {
      return todos.filter((t) => !t.done);
    } else {
      return todos;
    }
  }

  const todosTemporer = sortDoneUndone(todos);

  return (
    <div className="allElements">
      <div className="inputPartie">
        <h1>Todos</h1>
        <InputPartie
          addTodo={addTodo}
          deleteAllTodo={deleteAllTodo}
          todos={todos}
          sorting={sorting}
          statusDoneUndone={statusDoneUndone}
        />
      </div>
      <div className="todoPartie">
        <TodoPartie
          todosTemporer={todosTemporer}
          deleteTodo={deleteTodo}
          changeTitle={changeTitle}
          changeDate={changeDate}
          changeStatus={changeStatus}
        />
      </div>
    </div>
  );
}

export default App;
