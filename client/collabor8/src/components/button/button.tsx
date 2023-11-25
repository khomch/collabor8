import React from "react";
import "./button.css";

export type ButtonProps = {
  type: "primary" | "blue";
  label: string;
  onClick: any;
  disabled?: boolean;
};

function Button({ type, label, onClick, disabled }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`button button__${type} ${disabled && "button_disabled"}`}
    >
      {label}
    </button>
  );
}

export default Button;
