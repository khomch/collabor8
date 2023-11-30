import React, { FormEvent, useState } from 'react';
import './star-rating.css';
import Star from '../../../public/star-border.svg';
import StarFilled from '../../../public/star-fill.svg';
import Image from 'next/image';

type StarRatingProps = {
  rating: number;
  setRating?: (index: number) => void;
  width?: number;
};

function StarRating({ rating, setRating, width = 40 }: StarRatingProps) {
  const [hover, setHover] = useState(rating);
  const handleButtonClick = (index: number) => {
    setRating && setRating(index);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            className="star-rating__button"
            key={index}
            onClick={() => handleButtonClick(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            {index <= (hover || rating) ? (
              <Image width={width} src={StarFilled} alt="Star Filled" />
            ) : (
              <Image width={width} src={Star} alt="Star" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;
