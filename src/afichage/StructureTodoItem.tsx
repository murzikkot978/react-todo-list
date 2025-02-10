interface TodoItemProps {
  todos: [string, string];
}

function StructureTodoItem({ todos }: TodoItemProps) {
  const [text, date] = todos;
  return (
    <ul className="ulTodoPartie">
      <li className="liElementTodo">
        <p>{text}</p>
      </li>
      <li className="liElementDateChekDelet">
        <input type="checkbox" />
        <p>{date}</p>
        <button className="buttonDelete">delete</button>
      </li>
    </ul>
  );
}

export default StructureTodoItem;
