import React from "react";
import { useNavigate } from "react-router-dom";

function Todo({ title, description, onUpdate, onDelete }) {
  return (
    <div className="card rounded-xl border p-5 shadow-xl m-3">
      <div className="text-lg p-2 font-bold">{title}</div>
      <div className="text-sm font-medium text-gray-400 p-2">{description}</div>
      <hr />
      <button
        className="text-white bg-gray-500 hover:bg-gray-600 rounded-lg text-sm p-2 m-2 mt-4"
        onClick={onUpdate}
      >
        Update
      </button>
      <button
        className=" text-white bg-red-700 hover:bg-red-900 rounded-lg text-sm p-2 m-2 mt-4"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default Todo;
