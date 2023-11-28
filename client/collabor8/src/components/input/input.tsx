import { ChangeEvent, KeyboardEvent } from 'react';
import './input.css';

export type InputProps = {
  variant?: 'primary' | 'blue';
  required?: boolean;
  type: string;
  name: string;
  value?: string;
  label?: string;
  status?: 'default' | 'error';
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

function Input({
  required,
  type,
  name,
  label,
  value,
  placeholder,
  status,
  variant = 'primary',
  onChange,
  onKeyDown,
}: InputProps) {
  return (
    <div className="input">
      <label className="input__label bodytext3 bodytext3_semibold">{label}</label>
      <input
        required={required}
        className={`input__item input__item_${variant} bodytext3 input__${status}`}
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
