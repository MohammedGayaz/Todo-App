import React from "react";

function InputComponent({ label, type, placeholder, setTarget }) {
  return (
    <div className="p-5">
      <div className="text-lg font-medium py-2">{label}</div>
      <input
        className="text-gray-500 rounded-md border-2 p-2 w-full border-gray-200 focus:outline-gray-300"
        type={type}
        placeholder={placeholder}
        onChange={(e) => setTarget(e.target.value)}
      />
    </div>
  );
}

export default InputComponent;
