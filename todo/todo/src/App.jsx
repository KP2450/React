import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);
  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);
  const saveToLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLs();
  };
  const handleDelete = (e, id) => {
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    console.log(index);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLs();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
    saveToLs();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log(id);
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    console.log(index);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLs();
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container mx-auto my-5 rounded-xl p-5 bg-violet-600 min-h-[80vh] md:w-1/2 ">
        <h1 className="font-bold text-center text-xl">
          iTask-Manage your Todo at one place
        </h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold my-5">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-full px-5 py-1"
          />

          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-blue-800 disabled:bg-violet-700 hover:bg-violet-700 p-3 py-1 text-sm font-bold text-white rounded-md "
          >
            Add
          </button>
        </div>
        <input
          className="my-4"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        Show Finished
        <h2 className="text-lg font-bold text-yellow-200">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5">
              {" "}
              <div>No Todos</div>
            </div>
          )}
          {todos.map((item) => {
            if (showFinished || !item.isCompleted)
              return (
                <div
                  key={item.id}
                  className="todo flex md: w-1/2 my-3 justify-between  "
                >
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-blue-800 hover:bg-violet-700 p-3 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-blue-800 hover:bg-violet-700 p-3 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      {" "}
                      <MdDelete />
                    </button>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
