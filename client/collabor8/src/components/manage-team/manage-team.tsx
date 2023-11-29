import { ChangeEvent, useState } from 'react';
import Button from '../button/button';
import Input from '../input/input';
import VStack from '../ui/v-stack/v-stack';
import './manage-team.css';
import ManageTags from '../tags/tags';
import Tag from '../tag/tag';
import Role from '../ui/role/role';

const tempTeamData = {
  teamMembers: ['Alex, Juan, Arthur, Bruno'],
  openedRoles: [
    {
      id: '1',
      role: 'Frontend developer',
      techstack: ['TypeScript', 'Javascript', 'React'],
    },
    {
      id: '2',
      role: 'Backend developer',
      techstack: [
        'TypeScript',
        'Nodejs',
        'Express',
        'Express',
        'Express',
        'Express',
        'Express',
        'Express',
        'Express',
      ],
    },
  ],
};

function ManageTeam() {
  const [openedRoles, setOpenedRoles] = useState(tempTeamData.openedRoles);
  const [newRole, setNewRole] = useState('');
  const [tech, setTech] = useState<string[]>([]);

  const handleAddNewRole = (e: ChangeEvent<HTMLInputElement>) => {
    setNewRole(e.target.value);
  };

  const handelSubmit = () => {
    // TODO: save to DB
    console.log(tech);
  };

  return (
    <VStack size="6col">
      <div className="h5">Manage team </div>
      <div className="manage-team__roles">
        {openedRoles.map((roleData, index) => (
          <Role
            key={index}
            setOpenedRoles={setOpenedRoles}
            roleData={roleData}
          />
        ))}
      </div>
      <form className="manage-team__form">
        <div className="manage-team__add-role">
          <p className="bodytext1 bodytext1_semibold">Add new role </p>
          <Input
            variant="blue"
            type="text"
            name="role"
            label="Role"
            placeholder="Enter role"
            status="default"
            value={newRole}
            onChange={handleAddNewRole}
          />
          <ManageTags tags={tech} setTags={setTech} />
          <Button variant="blue" type="submit" label="Add" />
        </div>
      </form>
    </VStack>
  );
}

export default ManageTeam;
