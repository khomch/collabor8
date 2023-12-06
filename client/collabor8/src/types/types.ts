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
  technologyStack?: string[];
  links?: string[];
  projectHistory?: string[];
  references?: string[];
  projects?: TProjectInfo[];
  reviews?: TReview[];
};

export type TUserInfo = {
  _id?: string;
  userName: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password?: string;
  github?: string;
  website?: string;
  company?: string;
  socialMediaAccounts?: string;
  role?: string;
  bio?: string;
  yearsExperience?: string;
  profile?: TUserProfile;
  username?: string;
};

export type TUserState = {
  isLogged: boolean;
  userId: string | null;
  user: null | TUserInfo;
  status: "idle" | "loading" | "succeeded" | "failed";
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

export type TUserInProject = {
  _id: string;
  username: string;
  role: string;
  company: string;
};

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
  projectWorkspaces?: {
    name: string;
    link: string;
  }[];
  openedRoles?: TRole[];
  appliedUsers?: TUserInProject[];
  approvedUsers?: TUserInProject[];
  finishedUsers?: TUserInProject[];
};

export type TReview = {
  toUserId: string;
  rating: Number;
  feedback: string;
  fromUserName?: string;
};
