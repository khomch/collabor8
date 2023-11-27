import React from "react";
import icon from "../../../public/icon/i_close.svg";
import "./tag.css";
import Image from "next/image";

export type TagProps = {
  color: "gray" | "blue" | "pink" | "green" | "orange";
  label: string;
  isIcon?: boolean;
  onClick?: (val?: any) => void;
  index?: number;
};

function Tag({ color, label, isIcon, onClick, index }: TagProps) {
  return (
    <div className="tag" key={index}>
      <div className={`tag__item tag__${color} bodytext1_semibold`}>
        {label}
        {isIcon && (
          <Image
            onClick={onClick}
            className="tag__icon"
            src={icon}
            alt="icon"
          />
        )}
      </div>
    </div>
  );
}

export default Tag;
