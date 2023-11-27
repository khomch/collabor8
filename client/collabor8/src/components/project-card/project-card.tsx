import { TProjectInfo } from '@/types/types';
import Button from '../button/button';
import './project-card.css';
import Tag from '../tag/tag';
import Image from 'next/image';
import TechStackIcon from '../../../public/icon-techstack.svg';
import LevelIcon from '../../../public/icon-levels.svg';
import LinkIcon from '../../../public/icon-link.svg';
import LinkAbout from '../../../public/icon-about.svg';
import VStack from '../ui/v-stack/v-stack';
import Link from "next/link";

type ProjectCardProps = {
  project: TProjectInfo;
  btnLabel: "Show more" | "Apply";
};

function ProjectCard({ project, btnLabel }: ProjectCardProps) {
  return (
    <VStack size="9col">
      <div className="project-card">
        <div>
          <h2 className="project-card__title">{project.title}</h2>
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
              {project.techstack.length > 0 &&
                project.techstack?.map((technology) => (
                  <Tag color="gray" label={technology} />
                ))}
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
                <Image src={LinkAbout} alt="About project Icon" />
                <p className="bodytext3 bodytext3_semibold">About project</p>
              </div>
              <p className="bodytext3">{project.aboutProject}</p>
            </div>
            <Link href={"/projects-detail"}>
              <Button label={btnLabel} variant="primary" />
            </Link>
          </div>
        </div>
      </div>
    </VStack>
  );
}
export default ProjectCard;
