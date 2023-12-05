import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";

import Button from '@/components/button/button';

describe("Button component", () => {
  let getByText;
  let buttonElement;
  let onClickMock;

  beforeEach(() => {
    onClickMock = jest.fn();
    const renderResult = render(
      <Button variant="primary" label="Click me" onClick={onClickMock} />
    );
    getByText = renderResult.getByText;
    buttonElement = getByText("Click me");
  });

  it("renders button correctly", () => {
    expect(buttonElement).toBeInTheDocument();
  });

  it("button click triggers onclick callback", () => {
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("button is disabled when 'disabled' prop is true", () => {
    const { getByText } = render(
      <Button variant="primary" label="I'm disabled" disabled={true} onClick={() => {}} />
    );
    const buttonElement = getByText("I'm disabled");
    expect(buttonElement).toBeDisabled();
  });
});