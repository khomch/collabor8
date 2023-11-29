import type { JwtPayload } from 'jwt-decode';

export type TLoginDetails = {
  emailAddress: string;
  password: string;
};

export type TRegisterDetails = {
  emailAddress: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type TUserProfile = {
  technologyStack: string[];
  links: string[];
  projectHistory: string[];
  references: string[];
  projects: string[];
  rating?: string;
};

export type TUserInfo = {
  userName: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  github?: string;
  website?: string;
  company?: string;
  socialMediaAccounts?: string;
  role?: string;
  bio?: string;
  yearsExperience?: string;
  profile: TUserProfile;
};

export type TUserState = {
  isLogged: boolean;
  userId: string | null;
  user: object | TUserInfo;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
};

export type TRole = {
  _id?: string;
  role: string;
  techstack: string[];
};

export interface IMyJwtPayload extends JwtPayload {
  _id: string;
}

export type TProjectInfo = {
  _id?: string;
  projectOwnerId?: string;
  title: string;
  link: string;
  type: string;
  techstack: string[];
  aboutProject: string;
  estimatedDeadline: string;
  description: string;
  additionalInfo: string;
  level: string;
  projectWorkspaces: {
    name: string;
    link: string;
  }[];
  openedRoles: TRole[];
};
