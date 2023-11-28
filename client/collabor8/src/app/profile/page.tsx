'use client';

import ProfileCard from '@/components/profile-card/profile-card';
import ProfileEdit from "../profile-detail/page";
import './profile.css';

export default function Profile() {
  return (
    <search className="profile-page">
      <ProfileCard />
      <ProfileEdit />
    </search>
  );
}
