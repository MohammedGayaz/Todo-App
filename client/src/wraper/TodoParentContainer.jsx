import React from "react";

function TodoParentContainer({ children }) {
  return (
    <div id="parent" class="h-[100%] p-10 w-96">
      <div id="child" class="no-scrollbar h-[100%] overflow-y-scroll">
        {children}
      </div>
    </div>
  );
}

export default TodoParentContainer;
