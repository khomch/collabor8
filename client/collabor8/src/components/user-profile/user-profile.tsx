import React from "react";
import icon from "../../../public/icon/i_close.svg";
import StarRating from "../star-rating/star-rating";
import Member from "../user/user";
import "./user-profile.css";

export type UserProfileProps = {
  direction: "column" | "row";
  name: string;
  role?: string;
  company?: string;
  rating?: number;
};

function UserProfile({
  direction,
  name,
  role,
  company,
  rating,
}: UserProfileProps) {
  return (
    <div className={`user profile__${direction}`}>
      <Member icon="😵‍💫" />
      <div className="user__items">
        <div className="h6"> {name}</div>
        {rating ? (
          <StarRating rating={rating} width={20} />
        ) : (
          <div className="bodytext1 bodytext3_medium">
            {role} {company && ` at ${company}`}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
