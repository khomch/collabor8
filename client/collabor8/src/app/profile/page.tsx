'use client';

import { userProfile } from "@/apiService/profileServiceApi";
import ProfileCard from "@/components/profile-card/profile-card";
import { useEffect, useState } from "react";
import ProfileEdit from "../profile-edit/page";
import './profile.css';


export type Users = {
  userName: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password?: string;
  github?: string;
  website?: string;
  company?: string;
  socialMediaAccounts?: string;
  role?: string;
  bio?: string;
  yearsExperience?: string;
  profile?: ProfileProps;
};

export type ProfileProps = {
  technologyStack?: string[];
  links?: string[];
  projectHistory?: string[];
  references?: string[];
  projects: string[];
  rating?: string;
};

function Profile() {
  const data: Users = {
    userName: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    profile: {
      technologyStack: undefined,
      links: undefined,
      projectHistory: undefined,
      references: undefined,
      projects: [],
      rating: undefined,
    },
  };
  const [profile, setProfile] = useState<Users>(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userProfile();
        if (response?.status === 200) {
          setProfile(response?.data);
        } else {
          alert(response?.error);
        }
      } catch (error) {
        alert(`Error fetching user profile: ${JSON.stringify(error)}`);
      }
    };

    fetchData();
  }, []);

  return (
    <search className="profile-page">
      <ProfileCard {...profile} />
      <ProfileEdit {...profile} />
    </search>
  );
}

export default Profile;