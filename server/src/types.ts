export type TRole = {
    _id?: string;
    role: string;
    techstack: string[];
  };

  export type TUserInProject = {
    _id: string;
    username: string;
    role: string;
  }