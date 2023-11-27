import { ChangeEvent, KeyboardEvent } from "react";
import "./input.css";

export type InputProps = {
  type: string;
  name: string;
  value?: string;
  label?: string;
  status?: "default" | "error";
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

function Input({
  type,
  name,
  label,
  value,
  placeholder,
  status,
  onChange,
  onKeyDown,
}: InputProps) {
  return (
    <div className="input">
      <label className="input__label bodytext3_semibold">{label}</label>
      <input
        className={`input__item bodytext3_semibold input__${status}`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default Input;
