"use client";

import React, { useState } from "react";
import "./reviews-card.css";
import VStack from "../ui/v-stack/v-stack";
import { TReview, TUserInfo } from "@/types/types";
import ReviewItem from "../review-item/review-item";
import Tag from "../tag/tag";

function ReviewsCard({ reviews }: { reviews: TReview[] } & any) {
  return (
    <VStack size="3col">
      <div className="reviews-card">
        <h3 className="h6 filters-card__title">Reviews</h3>
        {reviews.map((item: any, index: number) => (
          <ReviewItem
            rating={item.rating}
            userName={item.fromUserName}
            feedback={item.feedback}
            key={index}
          />
        ))}
      </div>
    </VStack>
  );
}

export default ReviewsCard;
