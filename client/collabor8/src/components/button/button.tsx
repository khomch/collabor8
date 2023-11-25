import React from "react";
import "./button.css";

export type ButtonProps = {
  type: "primary" | "blue";
  label: string;
  onClick: any;
};

function Button({ type, label, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={`button button__${type}`}>
      {label}
    </button>
  );
}

export default Button;
