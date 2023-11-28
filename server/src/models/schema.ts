import { UUID } from 'mongodb';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserTable = new Schema({
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  password: { type: String, required: true },
  github: { type: String },
  website: { type: String },
  company: { type: String },
  socialMediaAccounts: { type: String },
  role: { type: String },
  bio: { type: String },
  yearsExperience: { type: String },
  profile: {
    technologyStack: [{ type: String }],
    links: [{ type: String }],
    projectHistory: [{ type: String }],
    references: [{ type: String }],
    projects: [{ type: String }],
    rating: { type: String },
  },
});

const ProjectInfomation = new Schema({
  projectOwnerId: { type: String, required: true, ref: 'User' },
  title: { type: String, required: true },
  link: { type: String, required: true },
  aboutProject: { type: String, required: true },
  estimatedDeadline: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  additionalInfo: { type: String },
  level: { type: String },
  // techstack:[ {type: String, required: true} ],
  // status: { type: String, required: true },

  projectWorkspaces: [
    {
      Name: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
  manageTeam: [
    {
      _id: UUID,
      role: { type: String, required: true },
      techStack: [{ type: String, required: true }],
    },
  ],
});

export const User = mongoose.model('User', UserTable);
export const Project = mongoose.model('Project', ProjectInfomation);
