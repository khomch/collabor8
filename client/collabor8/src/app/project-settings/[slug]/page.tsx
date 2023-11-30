'use client';

import { getProjectInfo } from '@/apiService/projectServicesApi';
import ManageProject from '@/components/manage-project/manage-project';
import ManageTeam from '@/components/manage-team/manage-team';
import { useSelector } from '@/redux-store/customHooks';
import { TProjectInfo } from '@/types/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import './project-edit.css';

export default function ProjectEdit() {
  const { userId } = useSelector((state) => state.userState);

  const projectInitialData: TProjectInfo = {
    type: '',
    techstack: [],
    level: '',
    projectOwnerId: userId || '',
    title: '',
    link: '',
    aboutProject: '',
    estimatedDeadline: '',
    description: '',
    additionalInfo: '',
    projectWorkspaces: [],
    openedRoles: [
      {
        role: '',
        techstack: [],
      },
    ],
    appliedUsers: [],
  };

  const params = useParams();
  const [openedProject, setOpenedProject] =
    useState<TProjectInfo>(projectInitialData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof params.slug === 'string') {
      if (params.slug === 'new') {
        setIsLoading(false);
      } else {
        getProjectInfo(params.slug)
          .then((response) => {
            setOpenedProject(response?.data);
            setIsLoading(false);
          })
          .catch((err) => console.log('error', err));
      }
    }
  }, []);

  return (
    <div className="project-edit-page">
      {!isLoading && (
        <>
          <ManageProject
            project={openedProject}
            setProject={setOpenedProject}
          />
          {openedProject && openedProject._id && (
            <ManageTeam
              projectOwnerId={userId}
              existingRoles={openedProject?.openedRoles}
              projectId={openedProject._id}
            />
          )}
        </>
      )}
    </div>
  );
}
