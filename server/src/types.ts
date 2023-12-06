export type TRole = {
    _id?: string;
    role: string;
    techstack: string[];
  };

export type TUserInProject = {
  _id: string;
  username: string;
  role: string;
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
