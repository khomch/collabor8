'use client';

import Button from '@/components/button/button';
import FiltersCard from '@/components/filters-card/filters-card';
import ProjectCard from '@/components/project-card/project-card';
import VStack from '@/components/ui/v-stack/v-stack';
import { useDispatch, useSelector } from '@/redux-store/customHooks';
import { fetchProjects } from '@/redux-store/slices/projectSlice';
import { TProjectInfo } from '@/types/types';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import './dashboard.css';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projectsInfo);
  const [projectsToRender, setProjectsToRender] = useState<
    TProjectInfo[] | null
  >(projects);
  const { user } = useSelector((state) => state.userState);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  useEffect(() => {
    setProjectsToRender(projects);
  }, [projects]);

  return (
    <section className="dashboard-page">
      <div className="dashboard">
        <div className="dashboard__content">
          <div className="dashboard-page__filters">
            {projects && projectsToRender && (
              <>
                <FiltersCard
                  projects={projects}
                  projectsToRender={projectsToRender}
                  setProjectsToRender={setProjectsToRender}
                />
                <VStack size="3col">
                  <Link href="/project-settings/new">
                    <Button variant={'primary'} label={'Start new project'} />
                  </Link>
                </VStack>
              </>
            )}
          </div>
          <div className="dashboard-page__projects">
            {projectsToRender &&
              projectsToRender.length > 0 &&
              projectsToRender.map((project) => (
                <ProjectCard
                  userInfo={user}
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
