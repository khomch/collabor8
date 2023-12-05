import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";

import Tag from '@/components/tag/tag';

describe("Tag component", () => {
  let getByText;
  let tagElement;

  beforeEach(() => {
    const renderResult = render(<Tag label="test tag" color="green" />);
    getByText = renderResult.getByText;
    tagElement = getByText("test tag");
  });

  it("renders tag correctly", () => {
    expect(tagElement).toBeInTheDocument();
  });

  it("tag have class coresponding to its color prop", () => {
    expect(tagElement).toHaveClass("tag__item tag__green bodytext3 bodytext3_semibold");
  });

  it("changes color to blue when selected", () => {
    fireEvent.click(tagElement);
    expect(tagElement).toHaveClass("tag__item tag__blue bodytext3 bodytext3_semibold");
  });

  it("changes color to gray when un-selected", () => {
    fireEvent.click(tagElement);
    fireEvent.click(tagElement);
    expect(tagElement).toHaveClass("tag__item tag__gray bodytext3 bodytext3_semibold");
  });
});
