export type Users = {
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
  profile: Profile;
};

export type Profile = {
  technologyStack?: string[];
  links?: string[];
  projectHistory?: string[];
  references?: string[];
  projects: string[];
  rating?: string;
};

export type Review = {
  toUserId?: string;
  rating?: Number;
  feedback?: string;
  fromUser?: string;
};

