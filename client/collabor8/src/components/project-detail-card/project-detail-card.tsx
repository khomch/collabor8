'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import ICheck from '../../../public/icon/i_check_circle.svg';
import IDate from '../../../public/icon/i_date.svg';
import IPerson from '../../../public/icon/i_person.svg';
import IPerson2 from '../../../public/icon/i_person_2.svg';
import IPersonBadge from '../../../public/icon/i_person_badge.svg';
import { getProjectInfo } from '../../apiService/projectServicesApi';
import Tag from '../tag/tag';
import VStack from '../ui/v-stack/v-stack';
import './project-detail-card.css';
export type ProfileCardProps = {
  direction: 'column' | 'row';
  name: string;
  role: string;
  company: string;
  projectinfo: string;
  estimatedDeadline: any;
  openedRoles: { _id: string; role: string }[];
  teamMembers: string[];
  status: string;
  firstName: string;
  lastName: string;
  approvedUsers: { _id: string; username: string }[];
};

function ProfileDetailCard() {
  const [projectData, setProjectInfo] = useState<ProfileCardProps | null>(null);

  const estimatedDeadline = formatDate(projectData?.estimatedDeadline);
  const openedroles = projectData?.openedRoles;
  const approvedUsers = projectData?.approvedUsers;
  const firstName = projectData?.firstName;
  const lastName = projectData?.lastName;

  const path = usePathname();
  const pathSegments = path.split('/');
  const param = pathSegments[pathSegments.length - 1];

  const fetchProjectInfo = useCallback(async (params: string) => {
    try {
      const projectInfo: any = await getProjectInfo(params);
      setProjectInfo(projectInfo.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProjectInfo(param);
  }, [fetchProjectInfo, param]);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return `${day} ${monthNames[monthIndex]} ${year}`;
  }

  return (
    <VStack size="3col">
      <div className="profile-detail">
        <div className="h6"> Project info</div>
        <div className="profile-detail__info">
          <div className="profile-detail__title">
            <Image
              className="profile-detail__icon"
              src={IPerson}
              alt="IPerson"
            />
            <span className="bodytext1 bodytext1_semibold">Project owner</span>
          </div>
          <div className="bodytext2 bodytext2_medium">
            {firstName} {lastName}
          </div>
        </div>

        <div className="profile-detail__info">
          <div className="profile-detail__title">
            <Image
              className="profile-detail__icon"
              src={IPerson2}
              alt="IPerson"
            />
            <span className="bodytext1 bodytext1_semibold">Team Members</span>
          </div>
          {/* <div className="profile-detail_members bodytext2 bodytext2_medium">
            <User icon={'😵‍💫'} />
            <User icon={'😎'} />
            <User icon={'🥹'} />
          </div> */}
          <ul>
            {approvedUsers?.map((item) => {
              return <ul key={item._id}>{item.username}</ul>;
            })}
          </ul>
        </div>

        <div className="profile-detail__info">
          <div className="profile-detail__title">
            <Image
              className="profile-detail__icon"
              src={ICheck}
              alt="IPerson"
            />
            <span className="bodytext1 bodytext1_semibold">Status</span>
          </div>
          <div className="profile-detail__tag">
            <Tag color={'green'} label={'New project'} />
          </div>
        </div>

        <div className="profile-detail__info">
          <div className="profile-detail__title">
            <Image className="profile-detail__icon" src={IDate} alt="IPerson" />
            <span className="bodytext1 bodytext1_semibold">
              Estimated Deadline
            </span>
          </div>
          <div className="bodytext2 bodytext2_medium">{estimatedDeadline}</div>
        </div>

        <div className="profile-detail__info">
          <div className="profile-detail__title">
            <Image
              className="profile-detail__icon"
              src={IPersonBadge}
              alt="IPerson"
            />
            <span className="bodytext1 bodytext1_semibold">Opened roles</span>
          </div>
          <div className="profile-detail__roles bodytext2 bodytext2_medium">
            <ul>
              {openedroles?.map((item) => {
                return <ul key={item._id}>{item.role}</ul>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </VStack>
  );
}

export default ProfileDetailCard;
