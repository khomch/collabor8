import React from "react";
import person from "../../../public/person.svg";
import "./user.css";
import Image from "next/image";

export type UserProps = {
  icon: "😵‍💫" | "😎" | "🥹" | "😅" | "🤓" | "😉";
};

function User({ icon }: UserProps) {
  return (
    <div className="member">
      <Image className="member__image" src={person} alt="member icon" />
      <div className="member__emoji">{icon}</div>
    </div>
  );
}

export default User;
