import React from "react";
import "./tag.css";

export type TagProps = {
  color: "gray" | "blue" | "pink" | "green" | "orange";
  label: string;
};

function Tag({ color, label }: TagProps) {
  return (
    <div className="tag">
      <div className={`tag__item tag__${color} bodytext1_semibold`}>
        {label}
      </div>
    </div>
  );
}

export default Tag;
