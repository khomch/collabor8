import FiltersCard from '@/components/filters-card/filters-card';
import ProjectCard from '@/components/project-card/project-card';
import VStack from '@/components/ui/v-stack/v-stack';
import './dashboard.css';
import { projects } from '@/_MOCK-DATA_/mock-data';

export default function Dashboard() {
  return (
    <section className="dashboard-page">
      <div className="dashboard">
        <div className="dashboard__content">
          <div className="dashboard-page__filters">
            <FiltersCard />
          </div>
          <div className="dashboard-page__projects">
            {projects.map((project) => (
              <ProjectCard btnLabel="Show more" project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
