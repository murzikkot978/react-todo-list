import './App.css';
import InputPart from './afichage/partie-input.tsx';
import TodoPart from './afichage/partie-todo.tsx';

function App() {
  return (
    <div className="allElements">
      <div className="inputPart">
        <h1>Todos</h1>
        <InputPart />
      </div>
      <div className="todoPart">
        <TodoPart />
      </div>
    </div>
  );
}

export default App;
