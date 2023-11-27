import React, { useState } from "react";
import UserProfile from "../user-profile/user-profile";
import Star from "../../../public/star-black.svg";
import "./profile-card.css";
import Image from "next/image";
import IPerson from "../../../public/icon/i_person.svg";
import ILink from "../../../public/icon/i_link.svg";
import ITech from "../../../public/icon/i_tech.svg";
import Tag from "../tag/tag";
import Button from "@/components/button/button";
import Modal from "../modal/modal";
import Review from "../review/review";

export type ProfileCardProps = {
  direction: "column" | "row";
  name: string;
  role: string;
  company: string;
};

function ProfileDetailCard() {
  const [showModal, setShowModal] = useState(false);
  const tempTech = [
    "Javascript",
    "Typescript",
    "AWS",
    "Git",
    "Angular JS",
    "React",
  ];

  return (
    <div className="card profile-card">
      <UserProfile
        direction={"column"}
        name={"Kamil Zmuda"}
        role={"Fullstack Developer "}
        company={"Codeworks"}
      />

      <div className="profile-card__reviews">
        <div className="profile-card__star_wrapper">
          <Image className="profile-card__star" src={Star} alt="Star" />
          5.00
        </div>
        <div
          onClick={() => setShowModal(true)}
          className="profile-card__review-btn bodytext2 bodytext2_semibold"
        >
          Reviews
        </div>
      </div>

      <div className="profile-card__info">
        <div className="profile-card__title">
          <Image className="profile-card__icon" src={IPerson} alt="IPerson" />
          <span className="bodytext1 bodytext1_semibold">Bio</span>
        </div>
        <div className="bodytext2 bodytext2_medium">
          I’m looking for a cool projects!
        </div>
      </div>

      <div className="profile-card__info">
        <div className="profile-card__title">
          <Image className="profile-card__icon" src={ILink} alt="IPerson" />
          <span className="bodytext1 bodytext1_semibold">Links</span>
        </div>
        <div className="profile-card__links bodytext2 bodytext2_medium">
          <span className="profile-card__link">github.com</span>
          <span className="profile-card__link">github.com/2ujin</span>
        </div>
      </div>

      <div className="profile-card__info">
        <div className="profile-card__title">
          <Image className="profile-card__icon" src={ITech} alt="IPerson" />
          <span className="bodytext1 bodytext1_semibold">Tech Stack</span>
        </div>
        <div className="profile-card__techs bodytext2 bodytext2_medium">
          {tempTech?.map((label) => (
            <Tag color={"gray"} label={label} />
          ))}
        </div>
      </div>

      <div className="profile-card__btn">
        <Button variant={"primary"} label={"Start new project"} />
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Review />
        </Modal>
      )}
    </div>
  );
}

export default ProfileDetailCard;
