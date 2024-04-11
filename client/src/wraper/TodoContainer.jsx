import React from "react";

function TodoContainer({ children }) {
  return (
    <div class="flex h-screen justify-center bg-slate-300">
      <div class="flex flex-col justify-center">
        <div
          id="main"
          class="h-[80%] max-w-fit border rounded-xl bg-white p-10 shadow-xl"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default TodoContainer;
