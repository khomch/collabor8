import { v4 } from 'uuid';

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userInProject = new Schema(
  {
    _id: { type: String },
    username: { type: String },
    role: { type: String },
    company: { type: String },
  }
)

const ProjectInformation = new Schema(
  {
    projectOwnerId: { type: String, required: true, ref: 'User' },
    title: { type: String, required: true },
    link: { type: String, required: true },
    aboutProject: { type: String, required: true },
    estimatedDeadline: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    additionalInfo: { type: String },
    level: { type: String },
    projectWorkspaces: [
      {
        name: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
    openedRoles: [
      {
        _id: {
          type: String,
          default: v4,
        },
        role: { type: String },
        techstack: [{ type: String }],
      },
    ],
    appliedUsers: [userInProject],
    approvedUsers: [userInProject],
    finishedUsers: [userInProject],
    reviewedUsers: [userInProject],
  },
  { timestamps: true }
);

const UserTable = new Schema({
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
    projectHistory: [ProjectInformation],
    references: [{ type: String }],
    projects: [ProjectInformation],
    reviews: [
      {
        type: {
          fromUserName: String,
          rating: Number,
          feedback: String,
        },
      },
    ],
  },
});

export const User = mongoose.model('User', UserTable);
export const Project = mongoose.model('Project', ProjectInformation);
