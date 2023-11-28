import Tag from '@/components/tag/tag';
import './role.css';
import IconClose from '../../../../public/icon-close.svg';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

type RoleProps = {
  roleData: { id: string; role: string; techstack: string[] };
  setOpenedRoles: Dispatch<
    SetStateAction<{ id: string; role: string; techstack: string[] }[]>
  >;
};

function Role({ roleData, setOpenedRoles }: RoleProps) {
  const handleDeleteRole = () =>
    setOpenedRoles((prev) => prev.filter((role) => role.id !== roleData.id));
  return (
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
  );
}

export default Role;
