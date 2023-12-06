import './project-work-card.css';
import VStack from '../ui/v-stack/v-stack';
import React, { useEffect, useState } from 'react';
import Router, { usePathname } from 'next/navigation';
import { getProjectInfo } from '../../apiService/projectServicesApi';
export type ProjectWorkCardprops = {
  projectWorkspaces: { _id: string; name: string; link: string }[];
};

function ProjectWorkCard() {
  const [projectData, setProjectInfo] = useState<ProjectWorkCardprops | null>(
    null
  );

  const projectWorkspaces = projectData?.projectWorkspaces;

  const path = usePathname();
  const pathSegments = path.split('/');
  const param = pathSegments[pathSegments.length - 1];

  useEffect(() => {
    async function fetchProjectInfo(params: string) {
      try {
        const response = await getProjectInfo(param);
        if (response?.status === 200) {
          setProjectInfo(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProjectInfo(path);
  }, [path, param]);

  return (
    <VStack size="3col">
      <div className="project-work-card">
        <div className="h6">Project Workspace</div>
        <div className="project-work-card__list">
          {projectWorkspaces?.map((item) => (
            <div key={item._id}>
              <ul>Name: {item.name}</ul>
              <ul>Link: {item.link}</ul>
            </div>
          ))}
        </div>
      </div>
    </VStack>
  );
}
export default ProjectWorkCard;
