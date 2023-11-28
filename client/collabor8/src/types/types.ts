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
  loggedUser: TUserInfo | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
};

export type TProjectInfo = {
  _id: string;
  projectOwnerId?: string;
  projectOwner?: string;
  title: string;
  link: string;
  type: string;
  techstack: string[];
  aboutProject: string;
  estimatedDeadline: string;
  description: string;
  additionalInfo: string;
  level: string;
};
