import './App.css';
import InputPartie from './afichage-todo/InputPartie.tsx';
import TodoPartie from './afichage-todo/TodoPartie.tsx';
import { useEffect } from 'react';
import apiFetchGetTodo from './api-fetch-todo/apiFetchGetTodo.ts';
import { useCategoriesStorage, useTodoStorage } from './zustand.ts';
import InputpartieCategories from './affichage-categories/InputpartieCategories.tsx';
import apiFetchGetCategories from './api-fetch-categories/apiFetchGetCategories.ts';
import CategoriesPartie from './affichage-categories/CategoriesPartie.tsx';

function App() {
  const setTodos = useTodoStorage((state) => state.setTodos);
  const setCategories = useCategoriesStorage((state) => state.setCategories);

  useEffect(() => {
    apiFetchGetCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  useEffect(() => {
    apiFetchGetTodo().then((todos) => {
      setTodos(todos);
    });
  }, []);

  return (
    <div className="allPage">
      <div className="allElementsCategories">
        <div className="inputPartie">
          <h1>Categories</h1>
          <InputpartieCategories />
        </div>
        <div className="categoriesPartie">
          <CategoriesPartie />
        </div>
      </div>
      <div className="allElementsTodo">
        <div className="inputPartie">
          <h1>Todos</h1>
          <InputPartie />
        </div>
        <div className="todoPartie">
          <TodoPartie />
        </div>
      </div>
    </div>
  );
}

export default App;
