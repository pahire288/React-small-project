import React, { useState } from "react";
import "./App.css";
import TodoInput from './components/TodoInput';
import Todolist from './components/TodoList';

function App() {
  const [listTodo, setListTodo] = useState([]);

  // Function to add todo to the list
  const addList = (inputText) => {
    if (inputText.trim() !== "") {
      setListTodo([...listTodo, inputText]);
    }
  };

  // Function to delete todo from the list
  const deleteListItem = (key) => {
    let newListTodo = [...listTodo];
    newListTodo.splice(key, 1);
    setListTodo(newListTodo);
  };

  return (
    <div className="main-container">
      <div className="center-container">
        {/* Input Component */}
        <TodoInput addList={addList} />

        <h1 className="app-heading">TODO</h1>
        <hr />

        {/* Render each todo item */}
        {listTodo.map((listItem, i) => (
          <Todolist
            key={i}
            index={i}
            item={listItem}
            deleteListItem={deleteListItem}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
