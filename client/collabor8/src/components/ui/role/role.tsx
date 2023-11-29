import Tag from '@/components/tag/tag';
import './role.css';
import IconClose from '../../../../public/icon-close.svg';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { TRole } from '@/types/types';
import { removeRole } from '@/apiService/projectServicesApi';

type RoleProps = {
  roleData: TRole;
  projectId: string;
  setOpenedRoles: Dispatch<SetStateAction<TRole[]>>;
};

function Role({ roleData, setOpenedRoles, projectId }: RoleProps) {
  const handleDeleteRole = () => {
    removeRole({
      projectOwnerId: '6565d9f4b9b5b51e51036c50',
      projectId,
      roleToDeleteId: roleData._id,
    }).then((res) => {
      if (res?.data.openedRoles) {
        setOpenedRoles(res.data.openedRoles);
      }
    });
  };
  return (
    roleData.role && (
      <div className="role">
        <div className="role__header">
          <p className="bodytext3 bodytext3_medium">{roleData.role}</p>
          <button
            type="button"
            className="role__close-btn"
            onClick={handleDeleteRole}
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
