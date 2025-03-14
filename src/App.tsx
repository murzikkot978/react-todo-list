import './App.css';
import InputPartie from './afichage/InputPartie.tsx';
import TodoPartie from './afichage/TodoPartie.tsx';
import { useEffect } from 'react';
import apiFetchGet from './api-fetch/apiFetchGet.ts';
import { useTodoStorage } from './zustand.ts';

function App() {
  const setTodos = useTodoStorage((state) => state.setTodos);

  useEffect(() => {
    apiFetchGet().then((todos) => {
      console.log('render');
      setTodos(todos);
    });
  }, []);

  return (
    <div className="allElements">
      <div className="inputPartie">
        <h1>Todos</h1>
        <InputPartie />
      </div>
      <div className="todoPartie">
        <TodoPartie />
      </div>
    </div>
  );
}

export default App;
