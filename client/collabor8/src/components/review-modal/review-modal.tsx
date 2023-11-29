import React, { FormEvent, useState } from "react";
import "./review-modal.css";
import Input from "../input/input";
import Button from "../button/button";
import StarRating from "../star-rating/star-rating";
import UserProfile from "../user-profile/user-profile";
import { TReview, TUserInfo, TUserProfile } from "@/types/types";
import { writeReview } from "@/apiService/userService";

interface ReviewProps {
  user: TUserInfo;
  onClose: () => void; // Adjust the type of onClose based on your needs
}

function ReviewModal({ user, onClose }: ReviewProps) {
  // TODO: Finish rating logic
  const [feedbackValue, setFeedbackValue] = useState("");
  const [rating, setRating] = useState(0);

  const handleFeedback = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const update: TReview = {
      rating,
      feedback: feedbackValue,
      toUserId: user._id,
    };

    const response: any = await writeReview(update);
    if (response?.status === 200) {
      onClose();
    }
    setFeedbackValue("");
  };

  return (
    <div className="review">
      <div className="review__header">
        <h2 className="h5">Write a review</h2>
        <p className="bodytext2">
          How did the developer approach the project? Please write a review.
        </p>
      </div>
      <div className="review__content">
        <UserProfile
          direction={"row"}
          name={user.userName}
          role={user.role}
          company={user.company}
        />
        <p className="review__text bodytext1">How was the developer?</p>

        <form className="review__form" onSubmit={handleSubmit}>
          <div className="review__rating">
            <StarRating rating={rating} setRating={setRating} />
          </div>
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

export default ReviewModal;
