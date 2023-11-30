import React, { FormEvent, useState } from "react";
import "./review-item.css";
import Input from "../input/input";
import Button from "../button/button";
import StarRating from "../star-rating/star-rating";
import UserProfile from "../user-profile/user-profile";

function ReviewItem({ userName, rating, feedback, index }: any) {
  return (
    <div className="review-item" key={index}>
      <UserProfile direction={"row"} name={userName} rating={rating} />
      <div style={{ width: 100 }}></div>

      <div className="review-item__feeback">{feedback}</div>
    </div>
  );
}

export default ReviewItem;
