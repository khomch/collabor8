import React, { ChangeEvent, ComponentPropsWithoutRef, KeyboardEvent } from 'react';
import './input.css';

interface InputPropsOriginal extends ComponentPropsWithoutRef<'input'> {}

export type InputProps = InputPropsOriginal & {
  id?: string;
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
  const inputId = `input_${name}`;
  return (
    <div className="input">
      <label className="input__label bodytext3 bodytext3_semibold" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
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
