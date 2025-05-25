import React from "react";
import { useEffect, useState } from "react";
import "../styles/todoList.css";

function TodoList() {
  const [todoItem, setTodoItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const todoPerPage = 10;

  const lastIndex = currentPage * todoPerPage;
  const firstIndex = lastIndex - todoPerPage;
  const todos = todoItem.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(todoItem.length / todoPerPage);

  useEffect(() => {
    fetchTodoItem();
  }, [currentPage]);

  const apiKey = import.meta.env.VITE_API_KEY;

  async function fetchTodoItem() {
    try {
      const response = await fetch(`${apiKey}`);
      const data = await response.json();
      setTodoItem(data);
      console.log(data);
    } catch (err) {
      console.log("Error occurred:", err);
    }
  }
  return (
    <div className="container">
      <div className="todoInfo">
        <h2 style={{ marginLeft: "70px" }}>Todo list</h2>
        {todos.map((ele) => (
          <div
            id="innerDiv"
            className={ele.completed ? "yes" : "no"}
            key={ele.id}
          >
            <div>
              <p>{ele.id}</p>
            </div>
            <div>
              <p className={ele.completed ? "completed" : null}>{ele.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="navigationPanel">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <p>
          Page {currentPage} / {totalPages}
        </p>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={todoItem.length <= lastIndex}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TodoList;
