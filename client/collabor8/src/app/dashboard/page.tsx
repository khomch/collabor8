'use client';

import FiltersCard from '@/components/filters-card/filters-card';
import ProjectCard from '@/components/project-card/project-card';
import { useDispatch, useSelector } from '@/redux-store/customHooks';
import { fetchProjects } from '@/redux-store/slices/projectSlice';
import { useEffect, useState } from 'react';
import './dashboard.css';
import { projectsMock } from '@/_MOCK-DATA_/mock-data';
import { TProjectInfo } from '@/types/types';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projectsInfo);
  const [projectsToRender, setProjectsToRender] = useState<
    TProjectInfo[] | null
  >(null);
  const { userId } = useSelector((state) => state.userState);
  useEffect(() => {
    dispatch(fetchProjects()).then((res) =>
      setProjectsToRender((res.payload as { data: TProjectInfo[] }).data)
    );
  }, []);

  return (
    <section className="dashboard-page">
      <div className="dashboard">
        <div className="dashboard__content">
          <div className="dashboard-page__filters">
            {projectsToRender && (
              <FiltersCard
                projects={projects}
                projectsToRender={projectsToRender}
                setProjectsToRender={setProjectsToRender}
              />
            )}
          </div>
          <div className="dashboard-page__projects">
            {projectsToRender &&
              [...projectsToRender].map((project) => (
                <ProjectCard
                  userId={userId}
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
