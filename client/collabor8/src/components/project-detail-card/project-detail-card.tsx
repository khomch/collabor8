"use client";

import React, { useState } from "react";
import UserProfile from "../user-profile/user-profile";
import Star from "../../../public/star-black.svg";
import "./project-detail-card.css";
import Image from "next/image";
import IPerson from "../../../public/icon/i_person.svg";
import IPerson2 from "../../../public/icon/i_person_2.svg";
import ICheck from "../../../public/icon/i_check_circle.svg";
import IDate from "../../../public/icon/i_date.svg";
import IPersonBadge from "../../../public/icon/i_person_badge.svg";
import Tag from "../tag/tag";
import User from "../user/user";
import VStack from "../ui/v-stack/v-stack";

export type ProfileCardProps = {
  direction: "column" | "row";
  name: string;
  role: string;
  company: string;
};

function ProfileDetailCard() {
  return (
    <VStack size="3col">
      <div className="profile-detail">
        <div className="h6"> Project info</div>
        <div className="profile-detail__info">
          <div className="profile-detail__title">
            <Image
              className="profile-detail__icon"
              src={IPerson}
              alt="IPerson"
            />
            <span className="bodytext1 bodytext1_semibold">Project owner</span>
          </div>
          <div className="bodytext2 bodytext2_medium">Juan Vásquez</div>
        </div>

        <div className="profile-detail__info">
          <div className="profile-detail__title">
            <Image
              className="profile-detail__icon"
              src={IPerson2}
              alt="IPerson"
            />
            <span className="bodytext1 bodytext1_semibold">Team members</span>
          </div>
          <div className="profile-detail_members bodytext2 bodytext2_medium">
            <User icon={"😵‍💫"} />
            <User icon={"😎"} />
            <User icon={"🥹"} />
          </div>
        </div>

        <div className="profile-detail__info">
          <div className="profile-detail__title">
            <Image
              className="profile-detail__icon"
              src={ICheck}
              alt="IPerson"
            />
            <span className="bodytext1 bodytext1_semibold">Status</span>
          </div>
          <div className="profile-detail__tag">
            <Tag color={"green"} label={"New project"} />
          </div>
        </div>

        <div className="profile-detail__info">
          <div className="profile-detail__title">
            <Image className="profile-detail__icon" src={IDate} alt="IPerson" />
            <span className="bodytext1 bodytext1_semibold">
              Estimated Deadline
            </span>
          </div>
          <div className="bodytext2 bodytext2_medium">Dec 15, 2023</div>
        </div>

        <div className="profile-detail__info">
          <div className="profile-detail__title">
            <Image
              className="profile-detail__icon"
              src={IPersonBadge}
              alt="IPerson"
            />
            <span className="bodytext1 bodytext1_semibold">Opened roles</span>
          </div>
          <div className="profile-detail__roles bodytext2 bodytext2_medium">
            <span>Frontend developer</span>
            <span>Backend developer</span>
            <span>Designer</span>
          </div>
        </div>
      </div>
    </VStack>
  );
}

export default ProfileDetailCard;
