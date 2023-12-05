import * as React from "react";
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Input from '@/components/input/input';

describe("Input component", () => {
  let getByLabelText;
  let inputElement;
  let onChangeMock;

  beforeEach(() => {
    onChangeMock = jest.fn();
    const renderResult = render(
      <Input label="Username" type="text" name="username" onChange={onChangeMock} required/>
    );
    getByLabelText = renderResult.getByLabelText;
    inputElement = getByLabelText(/Username/i);
  });

  it("renders input correctly", () => {
    expect(inputElement).toBeInTheDocument();
  });

  it("handles input change", () => {
    fireEvent.change(inputElement, { target: { value: 'newUsername' } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(inputElement.value).toBe('newUsername');
  });

  it("applies the 'required' attribute", () => {
    const { getByLabelText } = render(
      <Input label="Username" type="text" name="username" required />
    );
    const inputElement = getByLabelText(/Username/i);

    expect(inputElement).toBeRequired();
  });
});