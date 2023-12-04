import * as React from "react";
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Input from '@/components/input/input';

// Test Case 1: Renders input correctly
test('renders input correctly', () => {
  const { getByLabelText } = render(
    <Input label="Username" type="text" name="username" />
  );
  const inputElement = getByLabelText(/Username/i);
  expect(inputElement).toBeInTheDocument();
});

// Test Case 2: Handles input change
test('handles input change', () => {
  const onChangeMock = jest.fn();
  const { getByLabelText } = render(
    <Input label="Username" type="text" name="username" onChange={onChangeMock} />
  );
  const inputElement = getByLabelText(/Username/i);

  fireEvent.change(inputElement, { target: { value: 'newUsername' } });

  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(inputElement.value).toBe('newUsername');
});

// Test Case 3: Applies the 'required' attribute
test('applies the "required" attribute', () => {
  const { getByLabelText } = render(
    <Input label="Username" type="text" name="username" required />
  );
  const inputElement = getByLabelText(/Username/i);

  expect(inputElement).toBeRequired();
});
