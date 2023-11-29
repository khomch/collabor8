import Tag from '@/components/tag/tag';
import './role.css';
import IconClose from '../../../../public/icon-close.svg';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { TRole } from '@/types/types';

type RoleProps = {
  roleData: TRole;
  setOpenedRoles: Dispatch<SetStateAction<TRole[]>>;
};

function Role({ roleData, setOpenedRoles }: RoleProps) {
  const handleDeleteRole = () =>
    setOpenedRoles((prev) => prev.filter((role) => role._id !== roleData._id));
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
