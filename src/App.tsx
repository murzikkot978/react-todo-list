import './App.css';
import InputPartie from './afichage/InputPartie.tsx';
import TodoPartie from './afichage/TodoPartie.tsx';
import { useState, useEffect } from 'react';
import { Todo } from './models/Todo.ts';
import apiFetchGet from './api-fetch/apiFetchGet.ts';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (todo: Todo) => {
    setTodos(todos.filter((t) => t.id !== todo.id));
  };

  const deleteAllTodo = () => {
    setTodos([]);
  };

  useEffect(() => {
    apiFetchGet().then((todos) => setTodos(todos));
  }, []);

  return (
    <div className="allElements">
      <div className="inputPartie">
        <h1>Todos</h1>
        <InputPartie addTodo={addTodo} deleteAllTodo={deleteAllTodo} />
      </div>
      <div className="todoPartie">
        <TodoPartie todos={todos} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
}

export default App;
