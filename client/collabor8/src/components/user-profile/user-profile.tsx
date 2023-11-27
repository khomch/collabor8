import React from "react";
import icon from "../../../public/icon/i_close.svg";
import Member from "../user/user";
import "./user-profile.css";

export type UserProfileProps = {
  direction: "column" | "row";
  name: string;
  role: string;
  company: string;
};

function UserProfile({ direction, name, role, company }: UserProfileProps) {
  return (
    <div className={`user profile__${direction}`}>
      <Member icon="😵‍💫" />
      <div className="user__items">
        <div className="h6"> {name}</div>
        <div className="bodytext1 bodytext3_medium">
          {role} at {company}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
