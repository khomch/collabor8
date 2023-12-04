import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";

import Button from '@/components/button/button';

// Test 1: Render button correctly
test("renders button correctly", () => {
  const { getByText } = render(
    <Button variant="primary" label="Click me" />
  );
  const buttonElement = getByText("Click me");
  expect(buttonElement).toBeInTheDocument();
})

// Test 2: Button click event
test("button click triggers onclick callback", () => {
  const onClickMock = jest.fn();
  const { getByText } = render(
    <Button variant="primary" label="Click me" onClick={onClickMock} />
  );

  const buttonElement = getByText("Click me");
  fireEvent.click(buttonElement);

  expect(onClickMock).toHaveBeenCalledTimes(1);
});

// Test 3: Button click event with disabled button
test("button is disabled when 'disabled' prop is true", () => {
  const { getByText } = render(
    <Button variant="primary" label="Click me" disabled={true} onClick={() => {}} />
  );

  const buttonElement = getByText("Click me");
  expect(buttonElement).toBeDisabled();
});
