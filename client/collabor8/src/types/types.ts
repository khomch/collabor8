export type LoginDetails = {
  emailAddress: string,
  password: string
}

export type RegisterDetails = {
  emailAddress: string,
  userName: string,
  password: string,
  firstName: string,
  lastName: string
}

export type TProjectInfo = {
  _id: string;
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

