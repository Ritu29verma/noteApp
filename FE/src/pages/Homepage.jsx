import React, { useEffect, useState } from 'react';
import Create from '../components/Create';
import axios from 'axios';
import { MdDelete, MdEdit } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";

function Homepage() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleEditClick = (todo) => {
    setEditingId(todo._id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const fetchTodos = async () => {
    try {
      console.log("Fetching all todos...");
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/getNotes`);
      console.log("API response for all todos:", response);
  
      if (response.data.success) {
        console.log("Todos fetched successfully:", response.data.data);
        setTodos(response.data.data); // Access the 'data' array from the response
      } else {
        console.error("Unexpected response format:", response.data);
        setTodos([]); // Set to empty array if the format is unexpected
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]); // Handle errors gracefully
    }
  };
  
  useEffect(() => {
    console.log("Component mounted, fetching todos...");
    fetchTodos();
  }, []);
  
  const fetchTodoById = (id) => {
    console.log(`Fetching todo by ID: ${id}`);
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/getTodo/${id}`)
      .then((result) => {
        console.log(`API response for todo ID ${id}:`, result.data);
        if (result.data.success) {
          setSelectedTodo(result.data.data);
        } else {
          console.error("Unexpected response format:", result.data);
        }
      })
      .catch((err) => console.error("Error fetching todo by ID:", err));
  };
  

  const handleToggleCompleted = async (id) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/updateNote/${id}`,
        { completed: true } 
      );
      console.log("Note updated:", response.data);
      fetchTodos(); 
    } catch (err) {
      console.error("Error toggling todo status:", err);
    }
  };
  

  const handleSave = (id) => {
    axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/updateNote/${id}`, { 
      title: editTitle, 
      description: editDescription 
    })
    .then(result => {
      setTodos(todos.map(todo => 
        todo._id === id ? { ...todo, title: editTitle, description: editDescription } : todo
      ));
      setEditingId(null); // Exit edit mode
    })
    .catch(err => console.error('Error updating todo:', err));
  };

  
  // const handleDelete = (id) => {
  //   axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/deleteTodo/${id}`)
  //     .then(() => {
  //       setTodos(todos.filter(todo => todo._id !== id));
  //       if (selectedTodo && selectedTodo._id === id) {
  //         setSelectedTodo(null); // Clear the selected todo if it's deleted
  //       }
  //     })
  //     .catch(err => console.error('Error deleting todo:', err));
  // };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/deleteTodo/${id}`);
      console.log("Todo deleted");
      fetchTodos(); // Refresh the list after deletion
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };  

  const handleCancel = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-10">
        <h2 className="text-3xl font-bold mb-8">NoteApp</h2>

        <div className="w-full max-w-md ">
          <Create setTodos={setTodos} />
          <div className="mt-6 bg-white text-black p-4 rounded shadow-lg w-full">
  {todos.length === 0 ? (
    <div className="text-center text-gray-500">No Records</div>
  ) : (
    todos.map((todo) => (
      <div key={todo._id} className="bg-gray-100 p-4 my-2 rounded shadow-sm flex justify-between items-center">
        {/* Toggle Completed */}
        <div
          className="cursor-pointer flex items-center"
          onClick={() => handleToggleCompleted(todo._id)}
        >
          {todo.completed ? (
            <IoIosCheckmarkCircle className="m-1 text-green-500 text-xl" />
          ) : (
            <FaCircle className="m-1 text-gray-500 text-xl" />
          )}
        </div>

        {/* Edit or Display Todo */}
        {editingId === todo._id ? (
          <div className="flex flex-col flex-grow ml-4">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Edit title"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Edit description"
            ></textarea>
            <div className="mt-2 flex justify-end space-x-2">
              <button
                onClick={() => handleSave(todo._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-grow ml-4">
            <p className={`text-lg font-semibold ${todo.completed ? "line-through text-gray-600" : "text-black"}`}>{todo.title}</p>
            <p className="text-sm text-gray-700">{todo.description}</p>
          </div>
        )}

        {/* Edit and Delete Buttons */}
        <div className="flex space-x-4">
          <MdEdit
            className="cursor-pointer text-blue-500 text-xl"
            onClick={() => handleEditClick(todo)}
          />
          <MdDelete
            className="cursor-pointer text-red-500 text-xl"
            onClick={() => handleDelete(todo._id)}
          />
        </div>
      </div>
    ))
  )}
</div>

          {selectedTodo && (
          <div className="mt-4 bg-gray-200 text-black p-4 rounded shadow-lg">
            <h3 className="text-xl font-bold mb-2">Todo Details</h3>
            <p><strong>Title:</strong> {selectedTodo.title}</p>
            <p><strong>Description:</strong> {selectedTodo.description}</p>
            <p>
              <strong>Status:</strong>{" "}
              {selectedTodo.completed ? "Completed" : "Pending"}
            </p>
            <p><strong>Created At:</strong> {new Date(selectedTodo.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(selectedTodo.updatedAt).toLocaleString()}</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
