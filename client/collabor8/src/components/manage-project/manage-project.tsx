import React, { ChangeEvent, useState } from 'react';
import Input from '../input/input';
import VStack from '../ui/v-stack/v-stack';
import './manage-project.css';
import { Select } from '../ui/select/select';
import Button from '../button/button';

const types = ['Dev new project', 'Add feature', 'Design', 'Consulting'];

function ManageProject() {
  const [type, setType] = useState(types[0]);
  const [project, setProject] = useState({
    title: '',
    link: '',
    aboutProject: '',
    deadline: '',
    description: '',
    additionalInfo: '',
  });
  const [workspace, setWorkspace] = useState({ name: '', link: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleWorkspacesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkspace((prevWorkspace) => ({ ...prevWorkspace, [name]: value }));
  };

  return (
    <VStack size="6col">
      <form className="manage-project__form">
        <div className="h5">Create new project </div>
        <Input
          type="text"
          name="title"
          label="Title"
          placeholder="Enter project title"
          status="default"
          value={project.title}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="link"
          label="Link (GitHub / Website / etc)"
          placeholder="Enter link to website, repository, social network or leave empty"
          status="default"
          value={project.link}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="aboutProject"
          label="About Project"
          placeholder="Write a short sentence that describes your project"
          status="default"
          value={project.aboutProject}
          onChange={handleChange}
        />
        <Input
          type={'datetime-local'}
          name="deadline"
          label="Estimated deadline"
          placeholder="Write a short sentence that describes your project"
          status="default"
          value={project.deadline}
          onChange={handleChange}
        />
        <div className="manage-project__select">
          <p className="bodytext3 bodytext3_semibold manage-project__select-label">
            Level
          </p>
          <Select
            options={types}
            selected={type}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setType(e.target.value)
            }
          />
        </div>
        <Input
          type="text"
          name="description"
          label="Description"
          placeholder="Provide a short description of your project"
          status="default"
          value={project.description}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="additionalInfo"
          label="Additional info"
          placeholder="Add any additional info about your project"
          status="default"
          value={project.additionalInfo}
          onChange={handleChange}
        />
        <p className="bodytext1 bodytext1_semibold">Project workspace</p>
        <div className="manage-project__two-inputs">
          <Input
            type="text"
            name="name"
            label="Name"
            placeholder="e.g. Slack group"
            status="default"
            value={workspace.name}
            onChange={handleWorkspacesChange}
          />
          <Input
            type="text"
            name="link"
            label="Link"
            placeholder="Enter link"
            status="default"
            value={workspace.link}
            onChange={handleWorkspacesChange}
          />
        </div>
        <Button variant="primary" type="submit" label="Save" />
      </form>
    </VStack>
  );
}

export default ManageProject;
