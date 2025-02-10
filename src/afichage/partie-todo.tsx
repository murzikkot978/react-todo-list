import StructureTodoItem from './StructureTodoItem.tsx';

function TodoPart() {
  return (
    <div className="divUlTodoPart">
      <StructureTodoItem todos={['hello', '2025-02-15']} />
      <StructureTodoItem todos={['todo', '2025-02-15']} />
      <StructureTodoItem todos={['test', '2025-02-15']} />
    </div>
  );
}

export default TodoPart;
