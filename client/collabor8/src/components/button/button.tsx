import React, { ComponentPropsWithoutRef } from 'react';
import './button.css';

interface ButtonPropsOriginal extends ComponentPropsWithoutRef<'button'> {}

export type ButtonProps = ButtonPropsOriginal & {
  variant: 'primary' | 'blue' | 'green' | 'gray';
  label: string;
  disabled?: boolean;
  isSmall?: boolean;
  isLoading?: boolean;
};

function Button({
  isLoading = false,
  variant,
  label,
  onClick,
  disabled,
  type,
  isSmall,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`button button__${variant} ${disabled && 'button_disabled'} ${
        isSmall && 'button__small'
      } ${isLoading && 'button_loading'}`}
    >
      {!isLoading && label}
    </button>
  );
}

export default Button;
