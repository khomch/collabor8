'use client';

import React, { useState } from 'react';
import icon from '../../../public/icon/i_close.svg';
import './tag.css';
import Image from 'next/image';

export type TagProps = {
  color: 'gray' | 'blue' | 'pink' | 'green' | 'orange';
  label: string;
  isIcon?: boolean;
  onClick?: (val?: any) => void;
  setSelectedTags?: (val?: any) => void;
  index?: number;
};

function Tag({
  color,
  label,
  isIcon,
  onClick,
  index,
  setSelectedTags,
}: TagProps) {
  const [tagColor, setTagColor] = useState(color);
  const [isSelected, setIsSelected] = useState(false);
  const handleTagClick = () => {
    if (isSelected) {
      setSelectedTags &&
        setSelectedTags((prev: string[]) => prev.filter((el) => el !== label));
      setTagColor('gray');
      setIsSelected(false);
    } else {
      setSelectedTags && setSelectedTags((prev: string[]) => [...prev, label]);
      setTagColor('blue');
      setIsSelected(true);
    }
  };
  return (
    <div className="tag" key={index} onClick={handleTagClick}>
      <div
        className={`tag__item tag__${tagColor} bodytext3 bodytext3_semibold`}
      >
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
