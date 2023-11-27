import React, { FormEvent, useState } from 'react';
import './review.css';
import Star from '../../../public/star-border.svg';
import StarFilled from '../../../public/star-fill.svg';
import Image from 'next/image';
import Input from '../input/input';
import Button from '../button/button';
import StarRating from '../star-rating/star-rating';

function Review() {
  // TODO: Finish rating logic
  const [feedbackValue, setFeedbackValue] = useState('');

  const handleFeedback = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('SUBMIT', feedbackValue);
    setFeedbackValue('');
  };

  const rating = [1, 0, 0, 0, 0];
  return (
    <div className="review">
      <div className="review__header">
        <h2 className="h5">Write a review</h2>
        <p className="bodytext2">
          How did the developer approach the project? Please write a review.
        </p>
      </div>
      <div className="review__content">
        <p className="bodytext1">How was the developer?</p>
        <form className="review__form" onSubmit={handleSubmit}>
          <StarRating />
          {/* <p className="bodytext1">Feedback</p> */}
          <Input
            type="text"
            name="feedback"
            value={feedbackValue}
            label="Feedback"
            status="default"
            onChange={handleFeedback}
          />
          <Button variant="primary" type="submit" label="Submit" />
        </form>
      </div>
    </div>
  );
}

export default Review;
