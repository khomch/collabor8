import { addRole, addRoles, removeRole } from '@/apiService/projectServicesApi';
import { TRole } from '@/types/types';
import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../button/button';
import Input from '../input/input';
import ManageTags from '../tags/tags';
import Role from '../ui/role/role';
import VStack from '../ui/v-stack/v-stack';
import './manage-team.css';
import { generateRoles } from '@/apiService/openAIService';
import toast from 'react-hot-toast';

type ManageTeamProps = {
  existingRoles: TRole[] | undefined;
  projectId: string;
  projectOwnerId: string | null;
};

function isValidJson(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const handleToastDelay = () => {
  return setTimeout(() => {
    toast('It takes a while. Be patient 😶‍🌫️');
  }, 3000);
};

function ManageTeam({
  existingRoles,
  projectId,
  projectOwnerId,
}: ManageTeamProps) {
  const [openedRoles, setOpenedRoles] = useState<TRole[]>(existingRoles || []);
  const [generatedRoles, setGeneratedRoles] = useState<TRole[]>([]);
  const [newRole, setNewRole] = useState('');
  const [tech, setTech] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleAddNewRole = (e: ChangeEvent<HTMLInputElement>) => {
    setNewRole(e.target.value);
  };

  const handleDeleteRole = (roleToDelete: string | undefined) => {
    removeRole({
      projectOwnerId,
      projectId,
      roleToDeleteId: roleToDelete,
    }).then((res) => {
      if (res?.data.openedRoles) {
        setOpenedRoles(res.data.openedRoles);
        toast('Role deleted ⚠️');
      }
    });
  };

  const handleDeleteGeneratedRole = (roleToDelete: string | undefined) => {
    setGeneratedRoles((prev) =>
      prev.filter((role) => (role.id || role._id) !== roleToDelete)
    );
    toast('Role removed from suggestions ⚠️');
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

  async function handleAiGeneration(event: FormEvent) {
    event.preventDefault();
    try {
      setIsLoading(true);
      handleToastDelay();
      const response = await generateRoles({ projectId });
      try {
        if (isValidJson(response)) {
          const responseJSON = await JSON.parse(response);
          setGeneratedRoles((prev) => [...prev, ...responseJSON]);
          toast('Roles generated successfully ✅');
          setIsLoading(false);
          return responseJSON;
        } else {
          toast('❌ Something went wrong. \n Please, try again.');
          setIsLoading(false);
          console.log('ERROR: Not valid JSON');
        }
      } catch (error) {
        console.log('ERROR', error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSaveGenerated = async () => {
    const updatedProject = await addRoles({
      newRolesData: generatedRoles,
      projectId,
    });
    if (updatedProject) {
      setOpenedRoles((prev) => [...prev, ...generatedRoles]);
      setGeneratedRoles([]);
      toast('Roles successfully saved ✅');
    }
  };

  return (
    <VStack size="6col">
      <div className="h5 manage-team__title">Manage team </div>
      <div className="manage-team__roles">
        <p className="bodytext1 bodytext1_semibold">Opened roles</p>
        {openedRoles.length > 0 &&
          projectOwnerId &&
          openedRoles.map((roleData, index) => (
            <Role
              key={roleData._id || roleData.id}
              handleDeleteRole={handleDeleteRole}
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
          <Button
            variant={`${newRole ? 'blue' : 'gray'}`}
            type="submit"
            label="Add"
            disabled={newRole ? false : true}
          />
        </div>
      </form>
      <div className="manage-team__ai">
        <p className="bodytext1 bodytext1_semibold">AI suggestions </p>
        {generatedRoles.length > 0 &&
          projectOwnerId &&
          generatedRoles.map((roleData, index) => (
            <Role
              key={roleData._id || roleData.id}
              handleDeleteRole={handleDeleteGeneratedRole}
              roleData={roleData}
              isTemporary={true}
            />
          ))}
        {generatedRoles.length > 0 && (
          <Button
            variant="blue"
            type="button"
            label="Save"
            onClick={handleSaveGenerated}
            disabled={isLoading}
            isLoading={isLoading}
          />
        )}
        <Button
          variant="green"
          type="button"
          label="AI help ✨"
          onClick={handleAiGeneration}
          disabled={isLoading}
          isLoading={isLoading}
        />
      </div>
    </VStack>
  );
}

export default ManageTeam;
