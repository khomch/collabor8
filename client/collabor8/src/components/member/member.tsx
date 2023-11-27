import React from "react";
import person from "../../../public/person.svg";
import "./member.css";
import Image from "next/image";

export type MemberProps = {
  icon: "😵‍💫" | "😎" | "🥹" | "😅" | "🤓" | "😉";
};

function Member({ icon }: MemberProps) {
  return (
    <div className="member">
      <Image className="member__image" src={person} alt="member icon"/>
      <div className="member__emoji">{icon}</div>
    </div>
  );
}

export default Member;
