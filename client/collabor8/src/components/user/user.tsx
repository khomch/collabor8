import React from "react";
import person from "../../../public/person.svg";
import "./user.css";
import Image from "next/image";

export type UserProps = {
  approvedUsers?: { _id: string; username: string; }[];
};

const icons = ["😵‍💫", "😎", "🥹", "😅", "🤓", "😉"];

function User({ approvedUsers }: UserProps) {
  return (
    
  <div className="member">
    {approvedUsers?.map((item) => {
      const icon = icons[Math.floor(Math.random() * icons.length)];
      return (
        <ul key={item._id} className="ul_member">
          {item.username}
          <div className="member__emoji">{icon}</div>
        </ul>
      );
    })}
  </div>
      
   
  );
}

export default User;

