'use client';

import { ChangeEvent, useState } from 'react';
import Input from '../input/input';
import './filters-card.css';
import Tag from '../tag/tag';
import { Select } from '../ui/select/select';

const technologies = ['TypeScript', 'React', 'AWS', 'Node.js', 'Jest'];
const levels = ['Junior level', 'Middle level', 'Senior level'];

function FiltersCard() {
  const [role, setRole] = useState('');
  const [level, setLevel] = useState('');

  return (
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
        {technologies.map((tech, index) => (
          <Tag color="gray" label={tech} key={index} />
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
  );
}
export default FiltersCard;
