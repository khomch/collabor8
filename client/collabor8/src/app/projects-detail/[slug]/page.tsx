'use client';

import { getProjectInfo } from '@/apiService/projectServicesApi';
import ProfileBtnCard from '@/components/profile-btn-card/profile-btn-card';
import ProjectCard from '@/components/project-card/project-card';
import ProjectDescCard from '@/components/project-desc-card/project-desc-card';
import ProfileDetailCard from '@/components/project-detail-card/project-detail-card';
import ProjectWorkCard from '@/components/project-work-card/project-work-card';
import { useSelector } from '@/redux-store/customHooks';
import { TProjectInfo } from '@/types/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import './projects.css';

export default function MyProjects() {
  const projectInitialData: TProjectInfo = {
    type: "",
    techstack: [],
    level: "",
    projectOwnerId: "",
    title: "Loading...",
    link: "",
    aboutProject: "",
    estimatedDeadline: "",
    description: "Loading information...",
    additionalInfo: "Loading information...",
    projectWorkspaces: [],
    openedRoles: [
      {
        role: "",
        techstack: [],
      },
    ],
    appliedUsers: [],
    approvedUsers: [],
    finishedUsers: [],
  };

  const [openedProject, setOpenedProject] = useState(projectInitialData);

  const params = useParams();
  const userInfo = useSelector((state) => state.userState.user);

  useEffect(() => {
    const projectId = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    getProjectInfo(projectId)
      .then((response) => {
        setOpenedProject(response?.data);
      })
      .catch((err) => console.log("error", err));
  }, []);

  console.log(openedProject);
  return (
    openedProject._id && (
      <section className="projects-page">
        <div className="projects">
          <div className="projects__content">
            <div className="projects-page__filters">
              {openedProject.projectOwnerId === userInfo?._id &&
              openedProject.finishedUsers === null ? (
                <ProfileBtnCard
                  title={"Finished"}
                  status={"finished"}
                  data={openedProject.finishedUsers}
                  updateParentState={setOpenedProject}
                />
              ) : null}
              {openedProject.projectOwnerId === userInfo?._id &&
              openedProject.appliedUsers?.length ? (
                <ProfileBtnCard
                  title={"Want to Join"}
                  status={"join"}
                  data={openedProject.appliedUsers}
                  updateParentState={setOpenedProject}
                />
              ) : null}
              <ProfileDetailCard />
              <ProjectWorkCard />
            </div>
            <div className="projects-page__projects">
              <ProjectCard
                btnLabel="Apply"
                project={openedProject}
                userInfo={userInfo}
                updateParentState={setOpenedProject}
              />
              <ProjectDescCard
                desc={openedProject.description}
                info={openedProject.additionalInfo}
              />
            </div>
          </div>
        </div>
      </section>
    )
  );
}
