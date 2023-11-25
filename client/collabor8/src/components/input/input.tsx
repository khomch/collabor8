import React from "react";
import "./input.css";

export type InputProps = {
  type: string;
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  status: "default" | "error";
  onChange?: () => void;
};

function Input({
  type,
  name,
  label,
  value,
  placeholder,
  status,
  onChange,
}: InputProps) {
  return (
    <div className="input">
      <label className="input__label bodytext3_semibold">{label}</label>
      <input
        className={`input__item bodytext3_semibold ${status}`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
