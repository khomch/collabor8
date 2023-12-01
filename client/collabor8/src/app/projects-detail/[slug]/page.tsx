'use client';

import ProfileCard from '@/components/profile-card/profile-card';
import './projects.css';
import { projectsMock } from '@/_MOCK-DATA_/mock-data';
import ProjectCard from '@/components/project-card/project-card';
import ProfileDetailCard from '@/components/project-detail-card/project-detail-card';
import ProjectDescCard from '@/components/project-desc-card/project-desc-card';
import ProfileBtnCard from '@/components/profile-btn-card/profile-btn-card';
import ProjectWorkCard from '@/components/project-work-card/project-work-card';
import { useParams } from 'next/navigation';
import { getProjectInfo } from '@/apiService/projectServicesApi';
import { useEffect, useState } from 'react';
import { TProjectInfo } from '@/types/types';
import { useSelector } from '@/redux-store/customHooks';

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
  }, [openedProject.appliedUsers, openedProject.finishedUsers]);

  return (
    // <section className="projects-page">
    //   <div className="projects">
    //     <div className="projects__content">
    //       <div className="projects-page__filters">
    //         <ProfileDetailCard />
    //       </div>
    //       <div className="projects-page__projects">
    //         <ProjectCard btnLabel="Apply" project={projects[0]} />
    //         <ProjectDescCard desc={tempData.desc} info={tempData.info} />
    //       </div>
    //     </div>
    //   </div>
    // </section>

    // if owner project

    // TODO add conditional rendering:
    // non-owners shouldn't see finished/want to join section

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
              />
            ) : null}
            {openedProject.projectOwnerId === userInfo?._id &&
            openedProject.appliedUsers?.length ? (
              <ProfileBtnCard
                title={"Want to Join"}
                status={"join"}
                data={openedProject.appliedUsers}
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
            />
            <ProjectDescCard
              desc={openedProject.description}
              info={openedProject.additionalInfo}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
