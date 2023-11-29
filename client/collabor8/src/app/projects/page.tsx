'use client';

import { projectsMock } from '@/_MOCK-DATA_/mock-data';
import ProfileCard from '@/components/profile-card/profile-card';
import ProjectCard from '@/components/project-card/project-card';
import { useDispatch, useSelector } from '@/redux-store/customHooks';
import { fetchProjects } from '@/redux-store/slices/projectSlice';
import Image from 'next/image';
import { useEffect } from 'react';
import IconOwner from '../../../public/icon-owner.svg';
import IconTeamMember from '../../../public/icon-teammember.svg';
import './projects.css';

export default function MyProjects() {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projectsInfo);
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <section className="projects-page">
      <div className="projects">
        <div className="projects__content">
          <div className="projects-page__filters">
            <ProfileCard
              userName={''}
              firstName={''}
              lastName={''}
              emailAddress={''}
            />
          </div>
          <div className="projects-page__projects">
            <div className="projects-page__subtitle">
              <Image src={IconOwner} alt="Icon Project Owner" />
              <h2>Project Owner</h2>
            </div>

            <ProjectCard btnLabel="Show more" project={projectsMock[0]} />

            <div className="projects-page__subtitle">
              <Image src={IconTeamMember} alt="Team member Icon" />
              <h2>Team member in</h2>
            </div>
            {projects &&
              projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  btnLabel="Show more"
                  project={project}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
