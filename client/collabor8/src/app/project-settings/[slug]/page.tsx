'use client';

import { getProjectInfo } from '@/apiService/projectServicesApi';
import ManageProject from '@/components/manage-project/manage-project';
import ManageTeam from '@/components/manage-team/manage-team';
import { TProjectInfo } from '@/types/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import './project-edit.css';

const projectInitialData: TProjectInfo = {
  type: '',
  techstack: [],
  level: '',
  projectOwnerId: '6565d9f4b9b5b51e51036c50', // TODO change to current userId
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
};

export default function ProjectEdit() {
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
          {openedProject._id && (
            <ManageTeam
              existingRoles={openedProject?.openedRoles}
              projectId={openedProject?._id}
            />
          )}
        </>
      )}
    </div>
  );
}
