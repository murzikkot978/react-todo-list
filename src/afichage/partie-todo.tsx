function TodoPart() {
  return (
    <ul className="ulTodoPartie">
      <li className="liElementTodo">
        <p>todo1</p>
      </li>
      <li className="liElementDateChekDelet">
        <input type="checkbox" />
        <p>date1</p>
        <button className="buttonDelete">delete</button>
      </li>
    </ul>
  );
}

export default TodoPart;
