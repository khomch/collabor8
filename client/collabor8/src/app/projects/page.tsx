'use client';

import { getOwnerProjects } from '@/apiService/projectServicesApi';
import ProfileCard from '@/components/profile-card/profile-card';
import ProjectCard from '@/components/project-card/project-card';
import { useDispatch, useSelector } from '@/redux-store/customHooks';
import { fetchProjects } from '@/redux-store/slices/projectSlice';
import { fetchUserDetails } from '@/redux-store/slices/userSlice';
import { TProjectInfo } from '@/types/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import IconOwner from '../../../public/icon-owner.svg';
import IconTeamMember from '../../../public/icon-teammember.svg';
import './projects.css';

export default function MyProjects() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
  const [ownerProjects, setOwnerProjects] = useState([]);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchUserDetails());
  }, []);

  useEffect(() => {
    getOwnerProjects()
      .then((res) => {
        setOwnerProjects(res?.data);
      })
      .catch((err) => console.log('error', err));
  }, []);

  return (
    user && user._id && (
      <section className="projects-page">
        <div className="projects">
          <div className="projects__content">
            <div className="projects-page__filters">
              <ProfileCard {...user} />
            </div>
            {ownerProjects.length > 0 && (
              <div className="projects-page__projects">
                <div className="projects-page__subtitle">
                  <Image src={IconOwner} alt="Icon Project Owner" />
                  <h2>Project Owner</h2>
                </div>
                {ownerProjects?.map((project: TProjectInfo) => (
                  <ProjectCard
                    key={project._id}
                    btnLabel="Show more"
                    project={project}
                    userId={user._id}
                  />
                ))}

                <div className="projects-page__subtitle">
                  <Image src={IconTeamMember} alt="Team member Icon" />
                  <h2>Team member in</h2>
                </div>
                {/* {user &&
                  user!.profile!.projects.map((project: TProjectInfo) => (
                    <ProjectCard
                      key={project._id}
                      btnLabel="Show more"
                      project={project}
                      userId={user._id}
                    />
                  ))} */}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  );
}
