import { useState } from 'react';
import Button from '../button/button';
import Input from '../input/input';
import VStack from '../ui/v-stack/v-stack';
import './manage-team.css';
import ManageTags from '../tags/tags';

function ManageTeam() {
  const [role, setRole] = useState('');
  const [tech, setTech] = useState<string[]>([]);

  const handelSubmit = () => {
    // TODO: save to DB
    console.log(tech);
  };

  return (
    <VStack size="6col">
      <form className="manage-project__form">
        <div className="h5">Manage team </div>
        <div className="manage-project__add-role">
          <p className="bodytext1 bodytext1_semibold">Add new role </p>
          <Input
            variant="blue"
            type="text"
            name="role"
            label="Role"
            placeholder="Enter role"
            status="default"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <ManageTags tags={tech} setTags={setTech} />
          <Button variant="blue" type="submit" label="Add" />
        </div>
      </form>
    </VStack>
  );
}

export default ManageTeam;
