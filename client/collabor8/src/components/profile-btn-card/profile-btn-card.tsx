"use client";

import React, { useState } from "react";
import Button from "../button/button";
import VStack from "../ui/v-stack/v-stack";
import UserProfile from "../user-profile/user-profile";
import "./profile-btn-card.css";
import { approveUser, denyUser } from "@/apiService/projectServicesApi";
import { useParams } from "next/navigation";

export type ProfileCardProps = {
  title: string;
  status: "finished" | "join";
  data: User[];
};

type User = {
  _id: string;
  username: string;
  role: string;
};

function ProfileBtnCard({ title, status, data }: ProfileCardProps) {

  const params = useParams();
  const projectId = params.slug;

  const handleApprove = (user: User) => {
    approveUser({
      _id: user._id,
      username: user.username,
      role: user.role,
      projectId: projectId,
    })
    console.log("user", user);
  };

const handleDeny = (userId: string) => {
    denyUser({
      _id: userId,
      projectId: projectId,
    })
  }

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
                    <Button isSmall={true} variant="green" label={"Approve"} onClick={() => handleApprove(item)}/>
                  </div>
                  <div className="profile-btn-card__items">
                    <Button isSmall={true} variant="gray" label={"Deny"} onClick={() => handleDeny(item._id)}/>
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
