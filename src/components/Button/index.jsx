import React from "react";
import "./styles.css";

function Button({ text, onClick, blue, disabled, className }) {
  return (
    <div
      disabled={disabled}
      className={`${blue ? "btn btn-blue" : "btn"} ${className}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}

export default Button;
