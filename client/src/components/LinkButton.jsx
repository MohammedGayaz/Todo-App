import React from "react";
import { Link } from "react-router-dom";

function LinkButton({ text, buttonText, to }) {
  return (
    <div className="flex justify-center p-2 text-sm">
      <div>{text}</div>
      <Link to={to} className="underline px-1">
        {buttonText}
      </Link>
    </div>
  );
}

export default LinkButton;
