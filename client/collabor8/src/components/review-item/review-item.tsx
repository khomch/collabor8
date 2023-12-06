import React, { FormEvent, useState } from "react";
import "./review-item.css";
import UserProfile from "../user-profile/user-profile";

type ReviewItemProps = {
  userName: string;
  rating: number;
  feedback: string;
  index: number;
};

function ReviewItem({ userName, rating, feedback, index }: ReviewItemProps) {
  return (
    <div className="review-item" key={index}>
      <UserProfile direction={"row"} name={userName} rating={rating} />
      <div style={{ width: 100 }}></div>

      <div className="review-item__feeback">{feedback}</div>
    </div>
  );
}

export default ReviewItem;
