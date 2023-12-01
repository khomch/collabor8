'use client';

import { getUserProfile } from '@/apiService/profileServiceApi';
import ProfileCard from '@/components/profile-card/profile-card';
import { useEffect, useState } from 'react';
import ProfileEdit from '../profile-edit/page';
import './profile.css';
import { TUserInfo } from '@/types/types';
import { useRouter } from 'next/navigation';
import VStack from "@/components/ui/v-stack/v-stack";
import ReviewsCard from "@/components/reviews-card/reviews-card";
import toast, { Toaster } from "react-hot-toast";

export type ProfileProps = {
  technologyStack?: string[];
  links?: string[];
  projectHistory?: string[];
  references?: string[];
  projects: string[];
  rating?: string;
};

function Profile() {
  const data: TUserInfo = {
    userName: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  };
  const [profile, setProfile] = useState<TUserInfo>(data);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserProfile();
        if (response?.status === 200) {
          setProfile(response?.data);
        } else {
          console.log(response?.error);
          router.push("/login");
        }
      } catch (error) {
        console.log(`Error fetching user profile: ${JSON.stringify(error)}`);
      }
    };
    fetchData();
  }, []);

  return (
    profile.emailAddress && (
      <search className="profile-page">
        <section className="profile-page">
          <div className="profile">
            <div className="profile__content">
              <div className="profile-page__filters">
                <ProfileCard {...profile} />
                <ReviewsCard reviews={profile.profile?.reviews} />
              </div>
              <div className="profile-page__edit">
                <ProfileEdit {...profile} />
              </div>
            </div>
          </div>
        </section>
      </search>
    )
  );
}

export default Profile;
