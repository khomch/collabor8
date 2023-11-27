"use client";

import React, { useState } from "react";
import Button from "../button/button";
import VStack from "../ui/v-stack/v-stack";
import UserProfile from "../user-profile/user-profile";
import "./profile-btn-card.css";

export type ProfileCardProps = {
  title: string;
  status: "finished" | "join";
  data: User[];
};

type User = {
  username: string;
  role: string;
};

function ProfileBtnCard({ title, status, data }: ProfileCardProps) {
  return (
    <VStack size="3col">
      <div className="profile-btn-card">
        <div className="h6">{title}</div>

        {data?.map((item, index) => (
          <div key={index} className="profile-btn-card__wrapper">
            <UserProfile
              direction={"row"}
              name={item.username}
              role={item.role}
            />

            <div className="profile-btn-card__btn">
              {status === "finished" ? (
                <Button
                  isSmall={true}
                  variant={"primary"}
                  label={"Rate & Review"}
                />
              ) : (
                <>
                  <div className="profile-btn-card__items">
                    <Button isSmall={true} variant="green" label={"Approve"} />
                  </div>
                  <div className="profile-btn-card__items">
                    <Button isSmall={true} variant="gray" label={"Deny"} />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </VStack>
  );
}

export default ProfileBtnCard;
