"use client";

import Button from "@/components/button/button";
import Input from "@/components/input/input";
import UserProfile from "@/components/member-profile/member-profile";
import Tag from "@/components/tag/tag";
import React, { useState } from "react";
import "./profile.css";

export default function Profile() {
  return (
    <>
      {/* <div className="profile"> */}
      <UserProfile
        direction={"column"}
        name={"Kamil Zmuda"}
        role={"Fullstack Developer "}
        company={"Codeworks"}
      />
      {/* </div> */}
    </>
  );
}
