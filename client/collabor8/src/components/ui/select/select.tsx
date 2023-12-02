import { ChangeEvent } from "react";
import "./select.css";

type SelectProps = {
  isDisabled?: boolean;
  options: string[];
  selected: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export function Select({
  options,
  selected,
  onChange,
  isDisabled,
}: SelectProps) {
  return (
    <select
      value={selected}
      className="select"
      onChange={onChange}
      disabled={isDisabled}
    >
      {options &&
        options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
    </select>
  );
}
