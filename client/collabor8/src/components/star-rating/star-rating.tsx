import React, { FormEvent, useState } from 'react';
import './star-rating.css';
import Star from '../../../public/star-border.svg';
import StarFilled from '../../../public/star-fill.svg';
import Image from 'next/image';

type StarRatingProps = {
  onClick?: (index: number) => void;
};

function StarRating({ onClick }: StarRatingProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRatingClick = (index: number) => {
    setRating(index);
    //TODO add POST rating to server
    console.log('RATING: ', index);
    onClick && onClick(index);
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
            onClick={() => handleRatingClick(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            {index <= (hover || rating) ? (
              <Image width={40} src={StarFilled} alt="Star Filled" />
            ) : (
              <Image width={40} src={Star} alt="Star" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;
