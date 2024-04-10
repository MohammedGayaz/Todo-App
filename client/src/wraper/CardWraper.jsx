import React from "react";

function CardWraper({ children }) {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white max-w-sm p-2 h-max px-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default CardWraper;
