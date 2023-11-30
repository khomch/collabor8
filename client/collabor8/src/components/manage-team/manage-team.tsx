import { addRole } from '@/apiService/projectServicesApi';
import { TRole } from '@/types/types';
import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../button/button';
import Input from '../input/input';
import ManageTags from '../tags/tags';
import Role from '../ui/role/role';
import VStack from '../ui/v-stack/v-stack';
import './manage-team.css';

type ManageTeamProps = {
  existingRoles: TRole[] | undefined;
  projectId: string;
  projectOwnerId: string | null;
};

function ManageTeam({
  existingRoles,
  projectId,
  projectOwnerId,
}: ManageTeamProps) {
  const [openedRoles, setOpenedRoles] = useState<TRole[]>(existingRoles || []);
  const [newRole, setNewRole] = useState('');
  const [tech, setTech] = useState<string[]>([]);
  const handleAddNewRole = (e: ChangeEvent<HTMLInputElement>) => {
    setNewRole(e.target.value);
  };

  const handelSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newRoleData = {
      role: newRole,
      techstack: tech,
    };
    addRole({
      projectOwnerId,
      projectId,
      newRoleData,
    })
      .then((res) => {
        if (res?.data.openedRoles) {
          setOpenedRoles(res.data.openedRoles);
          setTech([]);
          setNewRole('');
        }
      })
      .catch((err) => console.log('Error while adding new user', err));
  };

  return (
    <VStack size="6col">
      <div className="h5">Manage team </div>
      <div className="manage-team__roles">
        {openedRoles.length > 0 &&
          openedRoles.map((roleData, index) => (
            <Role
              key={roleData._id || index}
              setOpenedRoles={setOpenedRoles}
              roleData={roleData}
              projectId={projectId}
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
          <Button
            variant={`${newRole ? 'blue' : 'gray'}`}
            type="submit"
            label="Add"
            disabled={newRole ? false : true}
          />
        </div>
      </form>
    </VStack>
  );
}

export default ManageTeam;
