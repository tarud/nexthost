// "use client"
// import React, { useState } from "react";

// interface Todo {
//   id: number;
//   text: string;
//   completed: boolean;
// }

// const TodoList: React.FC = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [newTodo, setNewTodo] = useState<string>("");

//   const handleAddTodo = () => {
//     if (newTodo.trim()) {
//       setTodos([
//         ...todos,
//         { id: Date.now(), text: newTodo.trim(), completed: false },
//       ]);
//       setNewTodo("");
//     }
//   };

//   const handleToggleComplete = (id: number) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   };

//   const handleDeleteTodo = (id: number) => {
//     setTodos(todos.filter((todo) => todo.id !== id));
//   };

//   const handleUpdateTodo = (id: number, newText: string) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, text: newText } : todo
//       )
//     );
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//       <h1 className=" text-black text-2xl font-bold text-center mb-4">Todo List</h1>
//       <div className="flex mb-4">
//         <input 
//           type="text"
//           value={newTodo}
//           onChange={(e) => setNewTodo(e.target.value)}
//           placeholder="Add a new todo"
//           className="text-black flex-grow p-2 border rounded-lg"
//         />
//         <button
//           onClick={handleAddTodo}
//           className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           Add
//         </button>
//       </div>
//       <ul>
//         {todos.map((todo) => (
//           <li
//             key={todo.id}
//             className={`flex items-center justify-between p-2 mb-2 border rounded-lg ${
//               todo.completed ? "bg-green-100 line-through" : "bg-gray-100"
//             }`}
//           >
//             <input
//               type="text"
//               value={todo.text}
//               onChange={(e) => handleUpdateTodo(todo.id, e.target.value)}
//               className={`flex-grow p-2 border-none bg-transparent focus:outline-none ${
//                 todo.completed ? "text-green-700" : "text-black"
//               }`}
//             />
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => handleToggleComplete(todo.id)}
//                 className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
//               >
//                 {todo.completed ? "Undo" : "Complete"}
//               </button>
//               <button
//                 onClick={() => handleDeleteTodo(todo.id)}
//                 className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoList;
"use client";
import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  const handleAddOrUpdateTodo = () => {
    if (newTodo.trim()) {
      if (editTodo) {
        // Update existing todo
        setTodos(
          todos.map((todo) =>
            todo.id === editTodo.id ? { ...todo, text: newTodo.trim() } : todo
          )
        );
        setEditTodo(null); // Clear edit state
      } else {
        // Add new todo
        setTodos([
          ...todos,
          { id: Date.now(), text: newTodo.trim(), completed: false },
        ]);
      }
      setNewTodo(""); // Clear input field
    }
  };

  const handleEditTodo = (todo: Todo) => {
    // Set text in input field for editing
    setNewTodo(todo.text);
    setEditTodo(todo); // Set the todo being edited
  };

  const handleToggleComplete = (id: number) => {
    // Toggle completion status
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    // Delete a todo
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-black text-2xl font-bold text-center mb-4">Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="text-black flex-grow p-2 border rounded-lg"
        />
        <button
          onClick={handleAddOrUpdateTodo}
          className={`ml-2 p-2 ${
            editTodo ? "bg-yellow-500" : "bg-blue-500"
          } text-white rounded-lg hover:bg-blue-600`}
        >
          {editTodo ? "Update" : "Add"}
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between p-2 mb-2 border rounded-lg ${
              todo.completed ? "bg-green-100 line-through" : "bg-gray-100"
            }`}
          >
            {editTodo && editTodo.id === todo.id ? (
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className={`flex-grow p-2 border-none bg-transparent focus:outline-none ${
                  todo.completed ? "text-green-700" : "text-black"
                }`}
              />
            ) : (
              <span
                className={`flex-grow p-2 border-none bg-transparent ${
                  todo.completed ? "text-green-700" : "text-black"
                }`}
              >
                {todo.text}
              </span>
            )}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleToggleComplete(todo.id)}
                className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                {todo.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => handleEditTodo(todo)}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
