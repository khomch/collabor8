'useclient';
import { TProjectInfo } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import AboutIcon from '../../../public/icon-about.svg';
import EditIcon from '../../../public/icon-edit.svg';
import LevelIcon from '../../../public/icon-levels.svg';
import LinkIcon from '../../../public/icon-link.svg';
import TechStackIcon from '../../../public/icon-techstack.svg';
import Button from '../button/button';
import Tag from '../tag/tag';
import VStack from '../ui/v-stack/v-stack';
import './project-card.css';
import { applyToProject } from '@/apiService/projectServicesApi';
import { TRole } from '@/types/types';


type ProjectCardProps = {
  project: TProjectInfo;
  btnLabel: 'Show more' | 'Apply';
  userId: string | null;
};

function ProjectCard({ project, btnLabel, userId = null }: ProjectCardProps) {
  const techstack =
    project.openedRoles &&
    project.openedRoles.reduce((acc: string[], curr: TRole) => {
      acc.push(...curr.techstack);
      return acc;
    }, []);

    const applyData = {
      projectId: project._id,
      userId: userId,
    }

    const handleApply = async () => {
      const response = await applyToProject(applyData);
      console.log('APPLY RESPONSE', response);
    }

  return (
    <VStack size="9col">
      <div className="project-card">
        <div>
          <h2 className="project-card__title">
            {project.title}
            {userId === project.projectOwnerId && (
              <Link
                href={`/project-settings/${project._id}`}
                className="project-card__edit-btn"
              >
                <Image src={EditIcon} alt="Icon edit" />
              </Link>
            )}
          </h2>
          <p className="bodytext3 bodytext3_semibold project-card__type">
            {project.type}
          </p>
        </div>

        <div className="project-card__info">
          <div className="project-card__general-info">
            <div className="project-card__subtitle">
              <Image src={TechStackIcon} alt="Tech Stack Icon" />
              <p className="bodytext3 bodytext3_semibold">Tech stack</p>
            </div>
            <div className="project-card__techstack">
              {techstack && techstack.length > 0 ? (
                techstack?.map((technology, index) => (
                  <Tag key={index} color="gray" label={technology} />
                ))
              ) : (
                <Tag color="gray" label="N/A" />
              )}
            </div>
            <div className="project-card__subtitle">
              <Image src={LevelIcon} alt="Level Icon" />
              <p className="bodytext3 bodytext3_semibold">Level</p>
            </div>
            <p className="bodytext3">{project.level}</p>
            <div className="project-card__subtitle">
              <Image src={LinkIcon} alt="Link Icon" />
              <p className="bodytext3 bodytext3_semibold">Link</p>
            </div>
            <a href={project.link} target="_blank" className="bodytext3">
              {project.link}
            </a>
          </div>

          <div className="project-card__about">
            <div>
              <div className="project-card__subtitle">
                <Image src={AboutIcon} alt="About project Icon" />
                <p className="bodytext3 bodytext3_semibold">About project</p>
              </div>
              <p className="bodytext3">{project.aboutProject}</p>
            </div>
            { btnLabel === 'Show more' &&
            <Link href={`/projects-detail/${project._id}`}>
              <Button label={btnLabel} variant="primary" />
            </Link>
            }
            { btnLabel === 'Apply' &&
              <Button label={btnLabel} variant="primary" onClick={() => handleApply()} />
            }
          </div>
        </div>
      </div>
    </VStack>
  );
}
export default ProjectCard;
