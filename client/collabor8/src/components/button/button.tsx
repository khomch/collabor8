import React, { ComponentPropsWithoutRef } from 'react';
import './button.css';

interface ButtonPropsOriginal extends ComponentPropsWithoutRef<'button'> {}

export type ButtonProps = ButtonPropsOriginal & {
  variant: 'primary' | 'blue';
  label: string;
  disabled?: boolean;
};

function Button({ variant, label, onClick, disabled, type }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`button button__${variant} ${disabled && 'button_disabled'}`}
    >
      {label}
    </button>
  );
}

export default Button;
