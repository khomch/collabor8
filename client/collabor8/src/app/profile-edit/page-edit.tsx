"use client";

import Button from "@/components/button/button";
import Input from "@/components/input/input";
import Tag from "@/components/tag/tag";
import React, { useState } from "react";
import "./style.css";

export default function ProfileEdit() {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    website: "",
    company: "",
    role: "",
    bio: "",
    techStack: "",
  });

  const [techInput, setTechInput] = useState("");
  const [tech, setTech] = useState(["Typescript"]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      const enteredTech = e.target.value;
      setTech([...tech, enteredTech]);
      setTechInput("");
    }
  };

  const handelTagRemove = (key: number) => {
    const _tect = [...tech];
    _tect.splice(key, 1);
    setTech(_tect);
  };

  const handelSubmit = () => {
    // TODO: save to DB
    console.log(profile, tech);
  };

  return (
    <>
      <div className="profile">
        <div className="profile__container">
          <div className="profile__title h5">Edit Profile</div>

          <div className="profile__input">
            <div className="prifile__item right">
              <Input
                type="text"
                name="username"
                label="Username"
                placeholder="username"
                status="default"
                value={profile.username}
                onChange={handleChange}
              />
            </div>
            <div className="prifile__item">
              <Input
                type="text"
                name="email"
                label="Email"
                placeholder="email"
                status="default"
                value={profile.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="profile__input">
            <div className="prifile__item right">
              <Input
                type="text"
                name="firstname"
                label="Firstname"
                placeholder="firstname"
                status="default"
                value={profile.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="prifile__item">
              <Input
                type="text"
                name="lastname"
                label="Lastname"
                placeholder="lastname"
                status="default"
                value={profile.lastname}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="profile__input">
            <div className="prifile__item right">
              <Input
                type="text"
                name="website"
                label="Website"
                placeholder="website"
                status="default"
                value={profile.website}
                onChange={handleChange}
              />
            </div>
            <div className="prifile__item">
              <Input
                type="text"
                name="company"
                label="Company"
                placeholder="company"
                status="default"
                value={profile.company}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="profile__title h5 top">Additional info</div>

          <div className="profile__input">
            <div className="prifile__item right">
              <Input
                type="text"
                name="username"
                label="Role"
                placeholder="role"
                status="default"
                value={profile.role}
                onChange={handleChange}
              />
            </div>
            <div className="prifile__item"></div>
          </div>

          <div className="profile__input">
            <div className="prifile__item right">
              <Input
                type="text"
                name="bio"
                label="Bio"
                placeholder="bio"
                status="default"
                value={profile.bio}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="profile__input">
            <div className="prifile__item right">
              <Input
                type="text"
                name="tech"
                label="Tech Stack"
                placeholder="Write Your Tech Stack!"
                status="default"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <div className="profile__tag">
                {tech?.map((item, index) => (
                  <Tag
                    key={index}
                    onClick={() => handelTagRemove(index)}
                    isIcon={true}
                    color={"gray"}
                    label={item}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="profile__button">
            <Button variant={"primary"} label={"Save"} onClick={handelSubmit} />
          </div>
        </div>
      </div>
    </>
  );
}
