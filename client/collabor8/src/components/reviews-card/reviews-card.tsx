"use client";

import React, { useState } from "react";
import "./reviews-card.css";
import VStack from "../ui/v-stack/v-stack";
import { TReview, TUserInfo } from "@/types/types";
import ReviewItem from "../review-item/review-item";
import Tag from "../tag/tag";

function ReviewsCard({ reviews }: { reviews?: TReview[] }) {
  return (
    <VStack size="3col">
      <div className="reviews-card">
        <h3 className="h6 filters-card__title">Reviews</h3>
        {reviews?.map((item: TReview, index: number) => (
          <ReviewItem
            rating={Number(item.rating)}
            userName={String(item.fromUserName)}
            feedback={item.feedback}
            key={index}
            index={0}
          />
        ))}
      </div>
    </VStack>
  );
}

export default ReviewsCard;
