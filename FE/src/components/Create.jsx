import React, { useState } from 'react';
import axios from 'axios';
function Create() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const addNote = () => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/createNote`, { 
      title: title,
      description: description
     })
     .then((response) => {
      console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        });
  };

  return (
    <div className="flex flex-col space-y-4 m-2">
      {/* Title Input */}
      <input
        type="text"
        className="w-full px-3 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Enter Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
  
      {/* Description Input */}
      <textarea
        className="w-full px-3 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Enter Note description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
  
      {/* Add Button */}
      <button
        type="button"
        onClick={addNote}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Add Note
      </button>
    </div>
  );
  
}

export default Create;
