'use client';

import React, { useState } from 'react';
import UserProfile from '../user-profile/user-profile';
import Star from '../../../public/star-black.svg';
import './profile-card.css';
import Image from 'next/image';
import IPerson from '../../../public/icon/i_person.svg';
import ILink from '../../../public/icon/i_link.svg';
import ITech from '../../../public/icon/i_tech.svg';
import Tag from '../tag/tag';
import Button from '@/components/button/button';
import Modal from '../modal/modal';
import ReviewModal from "../review-modal/review-modal";
import Link from "next/link";
import VStack from "../ui/v-stack/v-stack";
import { TUserInfo } from "@/types/types";

export type ProfileCardProps = {
  direction: "column" | "row";
  name: string;
  role: string;
  company: string;
};

function ProfileCard(data: TUserInfo) {
  const [showModal, setShowModal] = useState(false);
  const ratings: any =
    data?.profile?.reviews?.map((review) => review.rating) || [];
  const avgRating =
    ratings.length > 0
      ? ratings.reduce((sum: number, rating: number) => sum + rating, 0) /
        ratings.length
      : 0;

  return (
    <VStack size="3col">
      <div className="profile-card">
        <UserProfile
          direction={"column"}
          name={data.userName}
          role={data.role}
          company={data.company}
        />

        <div className="profile-card__reviews">
          <div className="profile-card__star_wrapper">
            <Image className="profile-card__star" src={Star} alt="Star" />
            {avgRating ? `${avgRating}.00` : "no reviews"}
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
          <div className="bodytext2 bodytext2_medium">{data.bio}</div>
        </div>

        <div className="profile-card__info">
          <div className="profile-card__title">
            <Image className="profile-card__icon" src={ILink} alt="IPerson" />
            <span className="bodytext1 bodytext1_semibold">Links</span>
          </div>
          <div className="profile-card__links bodytext2 bodytext2_medium">
            {data?.profile?.links?.map((link: string, index: number) => (
              <a
                href={link}
                target="_blank"
                key={index}
                className="profile-card__link"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="profile-card__info">
          <div className="profile-card__title">
            <Image className="profile-card__icon" src={ITech} alt="IPerson" />
            <span className="bodytext1 bodytext1_semibold">Tech Stack</span>
          </div>
          <div className="profile-card__techs bodytext2 bodytext2_medium">
            {data?.profile?.technologyStack?.map((label, index) => (
              <Tag key={index} color={"gray"} label={label} />
            ))}
          </div>
        </div>

        <div className="profile-card__btn">
          <Link href="/profile">
            <Button variant={"primary"} label={"Edit Profile"} />
          </Link>
        </div>

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <ReviewModal onClose={() => setShowModal(false)} user={data} />
          </Modal>
        )}
      </div>
    </VStack>
  );
}

export default ProfileCard;
