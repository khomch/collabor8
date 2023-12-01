'use client';

import { projectsMock } from '@/_MOCK-DATA_/mock-data';
import ProfileCard from '@/components/profile-card/profile-card';
import ProjectCard from '@/components/project-card/project-card';
import { useDispatch, useSelector } from '@/redux-store/customHooks';
import { fetchProjects } from '@/redux-store/slices/projectSlice';
import Image from 'next/image';
import { useEffect, useState } from "react";
import IconOwner from "../../../public/icon-owner.svg";
import IconTeamMember from "../../../public/icon-teammember.svg";
import "./projects.css";
import { TProjectInfo, TUserInfo } from "@/types/types";
import { getOwnerProjects } from "@/apiService/projectServicesApi";
import { fetchUserDetails } from "@/redux-store/slices/userSlice";

export default function MyProjects() {
  const dispatch = useDispatch();
  // const { projects } = useSelector((state: any) => state.projectsInfo);

  const user: TUserInfo | any = useSelector((state) => state.userState.user);
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
      .catch((err) => console.log("error", err));
  }, []);

  return (
    <section className="projects-page">
      <div className="projects">
        <div className="projects__content">
          <div className="projects-page__filters">
            <ProfileCard {...user} />
          </div>
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
                userInfo={user}
              />
            ))}

            <div className="projects-page__subtitle">
              <Image src={IconTeamMember} alt="Team member Icon" />
              <h2>Team member in</h2>
            </div>
            {user &&
              user?.profile?.projects.map((project: TProjectInfo) => (
                <ProjectCard
                  key={project._id}
                  btnLabel="Show more"
                  project={project}
                  userInfo={user}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
