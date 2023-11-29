"use client";

import { userInfomation, userProfile } from "@/apiService/profileServiceApi";
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import Tag from "@/components/tag/tag";
import React, { useEffect, useState } from "react";
import "./profile-edit.css";

function ProfileEdit() {
  const [profile, setProfile] = useState({
    userName: "",
    emailAddress: "",
    firstName: "",
    lastName: "",
    website: "",
    company: "",
    role: "",
    bio: "",
  });

  const [techInput, setTechInput] = useState("");
  const [tech, setTech] = useState(["Typescript"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userProfile();
        if (response?.status === 200) {
          setProfile(response?.data);
          setTech(response?.data?.profile?.technologyStack);
        } else {
          alert(response?.error);
        }
      } catch (error) {
        alert(`Error fetching user profile: ${JSON.stringify(error)}`);
      }
    };

    fetchData();
  }, []);

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

  const handelSubmit = async () => {
    // TODO: save to DB
    const {
      bio,
      company,
      emailAddress,
      firstName,
      lastName,
      userName,
      website,
      role,
    } = profile;
    const update = {
      bio,
      company,
      role,
      website,
      emailAddress,
      firstName,
      lastName,
      userName,
      profile: {
        links: [website],
        technologyStack: [...tech],
      },
    };
    const response: any = await userInfomation(update);
    if (response.name === "Error") {
      return;
    } else {
      alert("success!");
    }

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
                name="userName"
                label="Username"
                placeholder="userName"
                status="default"
                value={profile?.userName}
                onChange={handleChange}
              />
            </div>
            <div className="prifile__item">
              <Input
                type="text"
                name="emailAddress"
                label="Email"
                placeholder="emailAddress"
                status="default"
                value={profile?.emailAddress}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="profile__input">
            <div className="prifile__item right">
              <Input
                type="text"
                name="firstName"
                label="Firstname"
                placeholder="firstName"
                status="default"
                value={profile?.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="prifile__item">
              <Input
                type="text"
                name="lastName"
                label="Lastname"
                placeholder="lastName"
                status="default"
                value={profile?.lastName}
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
                value={profile?.website}
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
                value={profile?.company}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="profile__title h5 top">Additional info</div>

          <div className="profile__input">
            <div className="prifile__item right">
              <Input
                type="text"
                name="role"
                label="Role"
                placeholder="role"
                status="default"
                value={profile?.role}
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
                value={profile?.bio}
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
export default ProfileEdit;
