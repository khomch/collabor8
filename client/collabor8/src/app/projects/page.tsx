import ProfileCard from '@/components/profile-card/profile-card';
import Link from 'next/link';
import './projects.css';
import { projects } from '@/_MOCK-DATA_/mock-data';
import VStack from '@/components/ui/v-stack/v-stack';
import ProjectCard from '@/components/project-card/project-card';
import IconOwner from '../../../public/icon-owner.svg';
import IconTeamMember from '../../../public/icon-teammember.svg';
import Image from 'next/image';

export default function MyProjects() {
  return (
    <section className="projects-page">
      <div className="projects">
        <div className="projects__content">
          <div className="projects-page__filters">
            <ProfileCard />
          </div>
          <div className="projects-page__projects">
            <div className="projects-page__subtitle">
              <Image src={IconOwner} alt="Icon Project Owner" />
              <h2>Project Owner</h2>
            </div>

            <ProjectCard btnLabel="Show more" project={projects[0]} />

            <div className="projects-page__subtitle">
              <Image src={IconTeamMember} alt="Team member Icon" />
              <h2>Team member in</h2>
            </div>
            {projects.map((project) => (
              <ProjectCard btnLabel="Show more" project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
