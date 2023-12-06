"use client";

import React, { useState, Dispatch, SetStateAction } from "react";
import Button from "../button/button";
import VStack from "../ui/v-stack/v-stack";
import UserProfile from "../user-profile/user-profile";
import "./profile-btn-card.css";
import { approveUser, denyUser } from "@/apiService/projectServicesApi";
import { useParams } from "next/navigation";
import { TProjectInfo, TUserInProject, TUserInfo } from "@/types/types";
import { toast } from "react-hot-toast";
import Modal from '../modal/modal';
import ReviewModal from "../review-modal/review-modal";

export type ProfileCardProps = {
  title: string;
  status: "finished" | "join";
  data: TUserInProject[] | undefined;
  updateParentState?: Dispatch<SetStateAction<TProjectInfo>>;
};

function ProfileBtnCard({ title, status, data, updateParentState }: ProfileCardProps) {

  const [showModal, setShowModal] = useState(false);
  const [reviewedUser, setReviewedUser] = useState<TUserInProject | null>(null);

  const params = useParams();
  const projectId = params.slug;

  const handleApprove = async (user: TUserInProject) => {
    const response = await approveUser({
      _id: user._id,
      username: user.username,
      role: user.role,
      company: user.company,
      projectId: projectId,
    })
    if (response!.status === 200 ) {
      toast(`User approved.`);
      updateParentState!(response!.data)
    }
  };

const handleDeny = async (userId: string) => {
  const response = await denyUser({
      _id: userId,
      projectId: projectId,
    })
    if (response!.status === 200 ) {
      toast(`User denied.`);
      updateParentState!(response!.data)
    }
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
                  onClick={() => {
                    setReviewedUser(item);
                    setShowModal(true);
                  }}
                />
              ) : (
                <>
                  <div className="profile-btn-card__items">
                    <Button
                      className="profile-btn-card__approve"
                      isSmall={true}
                      variant="green"
                      label={"Approve"}
                      onClick={() => handleApprove(item)}
                    />
                  </div>
                  <div className="profile-btn-card__items">
                    <Button
                      isSmall={true}
                      variant="gray"
                      label={"Deny"}
                      onClick={() => handleDeny(item._id)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewModal
            onClose={() => setShowModal(false)}
            user={reviewedUser}
            projectId={projectId}
            updateParentState={updateParentState}
          />
        </Modal>
      )}
    </VStack>
  );
}

export default ProfileBtnCard;
