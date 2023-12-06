import React, { ComponentPropsWithoutRef } from 'react';
import './button.css';

interface ButtonPropsOriginal extends ComponentPropsWithoutRef<'button'> {}

export type ButtonProps = ButtonPropsOriginal & {
  variant: 'primary' | 'blue' | 'green' | 'gray';
  label: string;
  disabled?: boolean;
  isSmall?: boolean;
  isLoading?: boolean;
  className?: string;
};

function Button({
  isLoading = false,
  variant,
  label,
  onClick,
  disabled,
  type,
  isSmall,
  className,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`button button__${variant} ${className} ${disabled && 'button_disabled'} ${
        isSmall && 'button__small'
      } ${isLoading && 'button_loading'}  ${
        disabled && "button_disabled"
      }`}
    >
      {!isLoading && label}
    </button>
  );
}

export default Button;
