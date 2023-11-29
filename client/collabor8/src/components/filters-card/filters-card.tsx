'use client';

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Input from '../input/input';
import './filters-card.css';
import Tag from '../tag/tag';
import { Select } from '../ui/select/select';
import VStack from '../ui/v-stack/v-stack';
import { levels } from '../manage-project/manage-project';
import { TProjectInfo, TRole } from '@/types/types';

type FiltersCardProps = {
  projects: TProjectInfo[] | null;
  projectsToRender: TProjectInfo[] | null;
  setProjectsToRender: Dispatch<SetStateAction<TProjectInfo[] | null>>;
};

function FiltersCard({ projects, setProjectsToRender }: FiltersCardProps) {
  const [role, setRole] = useState('');
  const [level, setLevel] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const techstackArrWithDuplicates =
    projects &&
    projects.reduce((acc: string[], curr: TProjectInfo) => {
      acc.push(
        ...curr.openedRoles.flatMap((role: TRole) =>
          role.techstack.flatMap((tech: string) => tech)
        )
      );
      return acc;
    }, []);

  useEffect(() => {
    if (selectedTags.length === 0) {
      setProjectsToRender(projects);
    } else {
      setProjectsToRender(
        projects &&
          projects.filter((project) =>
            project.openedRoles.some((roleInfo: TRole) =>
              selectedTags.every((tag) => roleInfo.techstack.includes(tag))
            )
          )
      );
    }
  }, [selectedTags]);

  useEffect(() => {
    if (role.length === 0) {
      setProjectsToRender(projects);
    } else {
      setProjectsToRender(
        projects &&
          projects.filter((project) =>
            project.openedRoles.some((roleInfo: TRole) =>
              roleInfo.role.toLowerCase().includes(role.toLowerCase())
            )
          )
      );
    }
  }, [role]);

  const techstack = Array.from(new Set(techstackArrWithDuplicates));

  return (
    <VStack size="3col">
      <div className="filters-card">
        <h3 className="h6 filters-card__title">Filters</h3>
        <Input
          type="text"
          label="Desired role"
          name="desired-role"
          value={role}
          status="default"
          onChange={(e) => setRole(e.target.value)}
        />
        <h4 className="filters__label bodytext3_semibold">Tech stack</h4>
        <div className="filters__technologies">
          {techstack.map((tech, index) => (
            <Tag
              color="gray"
              label={tech}
              key={index}
              setSelectedTags={setSelectedTags}
            />
          ))}
        </div>
        <h4 className="filters__label bodytext3_semibold">Level</h4>
        <Select
          options={levels}
          selected={level}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setLevel(e.target.value)
          }
        />
      </div>
    </VStack>
  );
}
export default FiltersCard;
