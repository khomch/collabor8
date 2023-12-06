import Tag from '@/components/tag/tag';
import { TRole } from '@/types/types';
import Image from 'next/image';
import IconClose from '../../../../public/icon-close.svg';
import './role.css';

type RoleProps = {
  roleData: TRole;
  isTemporary?: boolean;
  handleDeleteRole: (roleId: string | undefined) => void;
};

function Role({ roleData, handleDeleteRole, isTemporary }: RoleProps) {
  const handleRemoveRole = () => {
    if (roleData._id || roleData.id) {
      handleDeleteRole(roleData._id || roleData.id);
    }
  };
  return (
    roleData.role && (
      <div className={`role ${isTemporary && 'role_temporary'}`}>
        <div className="role__header">
          <p className="bodytext3 bodytext3_medium">{roleData.role}</p>
          <button
            type="button"
            className="role__close-btn"
            onClick={handleRemoveRole}
          >
            <Image src={IconClose} alt="Icon Close" width={14} />
          </button>
        </div>
        <div className="role__techstack">
          {roleData.techstack.map((tech, index) => (
            <Tag label={tech} color="gray" key={index} />
          ))}
        </div>
      </div>
    )
  );
}

export default Role;
