'use client';

import { getUserProfile } from '@/apiService/profileServiceApi';
import ProfileCard from '@/components/profile-card/profile-card';
import { useEffect, useState } from 'react';
import ProfileEdit from '../profile-edit/page';
import './profile.css';
import { TUserInfo } from '@/types/types';
import { useRouter } from 'next/navigation';

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
    userName: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
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
          router.push('/login');
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
        <ProfileCard {...profile} />
        <ProfileEdit {...profile} />
      </search>
    )
  );
}

export default Profile;
