import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../button/button';
import Input from '../input/input';
import VStack from '../ui/v-stack/v-stack';
import './manage-team.css';
import ManageTags from '../tags/tags';
import Tag from '../tag/tag';
import Role from '../ui/role/role';
import { addTeamMember } from '@/apiService/projectServicesApi';

const tempTeamData = {
  teamMembers: ['Alex, Juan, Arthur, Bruno'],
  openedRoles: [
    {
      id: '1',
      role: 'Frontend developer',
      techStack: ['TypeScript', 'Javascript', 'React'],
    },
    {
      id: '2',
      role: 'Backend developer',
      techStack: [
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

  const handelSubmit = (e: FormEvent) => {
    // TODO: save to DB
    e.preventDefault();
    addTeamMember({
      projectOwnerId: '6565d9f4b9b5b51e51036c50',
      projectId: '6565ff3a27d034f231cc8038',
      teamMemberData: {
        role: newRole,
        techStack: tech,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log('Error while adding new user', err));

    console.log(newRole);
    console.log(tech);
  };

  return (
    <VStack size="6col">
      <div className="h5">Manage team </div>
      <div className="manage-team__roles">
        {openedRoles.map((roleData) => (
          <Role
            key={roleData.id}
            setOpenedRoles={setOpenedRoles}
            roleData={roleData}
          />
        ))}
      </div>
      <form className="manage-team__form" onSubmit={handelSubmit}>
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
