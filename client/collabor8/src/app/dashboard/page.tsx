'use client';

import FiltersCard from '@/components/filters-card/filters-card';
import ProjectCard from '@/components/project-card/project-card';
import { useDispatch, useSelector } from '@/redux-store/customHooks';
import { fetchProjects } from '@/redux-store/slices/projectSlice';
import { useEffect } from 'react';
import './dashboard.css';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projectsInfo);
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <section className="dashboard-page">
      <div className="dashboard">
        <div className="dashboard__content">
          <div className="dashboard-page__filters">
            <FiltersCard />
          </div>
          <div className="dashboard-page__projects">
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
