'use client';

import Button from '@/components/button/button';
import Input from '@/components/input/input';
import Tag from '@/components/tag/tag';
import React, { useState } from 'react';
import './project-edit.css';
import VStack from '@/components/ui/v-stack/v-stack';
import ManageProject from '@/components/manage-project/manage-project';
import ManageTeam from '@/components/manage-team/manage-team';

export default function ProjectEdit() {
  const [project, setproject] = useState({
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    website: '',
    company: '',
    role: '',
    bio: '',
    techStack: '',
  });

  const [techInput, setTechInput] = useState('');
  const [tech, setTech] = useState(['Typescript']);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setproject((prevproject) => ({
      ...prevproject,
      [name]: value,
    }));
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      const enteredTech = e.target.value;
      setTech([...tech, enteredTech]);
      setTechInput('');
    }
  };

  const handelTagRemove = (key: number) => {
    const _tect = [...tech];
    _tect.splice(key, 1);
    setTech(_tect);
  };

  const handelSubmit = () => {
    // TODO: save to DB
    console.log(project, tech);
  };

  return (
    <div className="project-edit-page">
      <ManageProject />
      <ManageTeam />
    </div>
  );
}
