'use client';


import React, { useEffect, useState } from 'react';
import UserProfile from '../user-profile/user-profile';
import Router, { usePathname } from 'next/navigation';
import Star from '../../../public/star-black.svg';
import './project-detail-card.css';
import Image from 'next/image';
import IPerson from '../../../public/icon/i_person.svg';
import IPerson2 from '../../../public/icon/i_person_2.svg';
import ICheck from '../../../public/icon/i_check_circle.svg';
import IDate from '../../../public/icon/i_date.svg';
import IPersonBadge from '../../../public/icon/i_person_badge.svg';
import Tag from '../tag/tag';
import User from '../user/user';
import VStack from '../ui/v-stack/v-stack';
import {getProjectInfo} from '../../apiService/projectServicesApi'
export type ProfileCardProps = {
  direction: 'column' | 'row';
  name: string;
  role: string;
  company: string;
  projectinfo: any ;
  estimatedDeadline: any;
  openedRoles: string[];
  teamMembers:string[];
  status:any;
  firstName:string;
  lastName:string;
};

function ProfileDetailCard() {
 
  const [projectData,setProjectInfo] = useState<ProfileCardProps | null>(null)
  const [projectStatus,setProjectStatus] = useState([])
   
  const estimatedDeadline = formatDate(projectData?.estimatedDeadline)
  const openedroles = projectData?.openedRoles
  const teamMembers = projectData?.teamMembers
  const status = projectData?.status 
  const firstName = projectData?.firstName
  const lastName = projectData?.lastName
  
  const path = usePathname()
  const pathSegments = path.split('/');
  const param = pathSegments[pathSegments.length - 1];

    async function fetchProjectInfo(params:string) {
    try {
      const projectInfo : any = await getProjectInfo(param)
      setProjectInfo(projectInfo.data)  
      setProjectInfo(projectInfo.data.type)
      
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchProjectInfo(path)
    
  })

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
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
          <div className="bodytext2 bodytext2_medium">{firstName} {lastName}</div>
        </div>
  
        <div className="profile-detail__info">
          <div className="profile-detail__title">
            <Image
              className="profile-detail__icon"
              src={IPerson2}
              alt="IPerson"
            />
            <span className="bodytext1 bodytext1_semibold"></span>
          </div>
          <div className="profile-detail_members bodytext2 bodytext2_medium">
            <User icon={'😵‍💫'} />
            <User icon={'😎'} />
            <User icon={'🥹'} />
          </div>
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
                return <ul key={item._id}>{item.role}</ul>
              })}
            </ul>
          </div>
        </div>
      </div>
    </VStack>
  );
}

export default ProfileDetailCard;
