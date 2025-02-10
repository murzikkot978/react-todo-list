function TodoPart() {
  return (
    <div className="divUlTodoPart">
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
      <ul className="ulTodoPartie">
        <li className="liElementTodo">
          <p>todo2</p>
        </li>
        <li className="liElementDateChekDelet">
          <input type="checkbox" />
          <p>date1</p>
          <button className="buttonDelete">delete</button>
        </li>
      </ul>
      <ul className="ulTodoPartie">
        <li className="liElementTodo">
          <p>todo3</p>
        </li>
        <li className="liElementDateChekDelet">
          <input type="checkbox" />
          <p>date1</p>
          <button className="buttonDelete">delete</button>
        </li>
      </ul>
    </div>
  );
}

export default TodoPart;
