import React from "react";

function MainHeading({ title }) {
  return (
    <div className="flex justify-center">
      <h1 className="text-4xl font-bold">{title}</h1>
    </div>
  );
}

export default MainHeading;
