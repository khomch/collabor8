'use client';

import Button from '@/components/button/button';
import Input from '@/components/input/input';
import Tag from '@/components/tag/tag';
import React, { useEffect, useState } from 'react';
import './project-edit.css';
import VStack from '@/components/ui/v-stack/v-stack';
import ManageProject from '@/components/manage-project/manage-project';
import ManageTeam from '@/components/manage-team/manage-team';
import { useSelector } from '@/redux-store/customHooks';
import { useParams } from 'next/navigation';
import { getProjectInfo } from '@/apiService/projectServicesApi';
import { TProjectInfo } from '@/types/types';

export default function ProjectEdit() {
  const projectInitialData: TProjectInfo = {
    _id: '',
    projectOwner: '',
    type: '',
    techstack: [],
    level: '',
    projectOwnerId: '6565d9f4b9b5b51e51036c50',
    title: '',
    link: '',
    aboutProject: '',
    estimatedDeadline: '',
    description: '',
    additionalInfo: '',
  };
  const [openedProject, setOpenedProject] =
    useState<TProjectInfo>(projectInitialData);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    if (typeof params.slug === 'string') {
      if (params.slug === 'new') {
        setIsLoading(false);
      } else {
        getProjectInfo(params.slug)
          .then((response) => {
            if (response && response.status === 200) {
              setOpenedProject(response.data);
              setIsLoading(false);
            } else {
              console.log('Error:', response && response.error);
            }
          })
          .catch((err) => console.log('error', err));
      }
    }
  }, []);

  return (
    <div className="project-edit-page">
      {!isLoading && (
        <ManageProject project={openedProject} setProject={setOpenedProject} />
      )}
      <ManageTeam />
    </div>
  );
}
