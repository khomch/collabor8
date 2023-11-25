var mongoose = require('mongoose');
import { v4 as uuidv4 } from 'uuid';
var Schema = mongoose.Schema;

///remember to us  uniqueId: uuidv4() when creating the unique id in registration 

var UserTable = new Schema({
    uniqueId: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    password: { type: String, required: true },
    github: { type: String },
    website: { type: String },
    company: { type: String },
    socialMediaAccounts: { type: String },
    profile: {
        bio: { type: String },
        technologyStack: [{ type: String }],
        yearsExperience: { type: String },
        links: [{ type: String }],
        projectHistory: [{ type: String }],
        references: [{ type: String }],
        projects: [{ type: String }],
        rating: { type: String }
    }
});


////uniqueId: uuidv4()

const ProjectInfomation = new Schema({
    projectOwnerId: { type: String, required: true, ref: 'User' },
    projectId: { type: String, required: true, unique: true },
    projectName: { type: String, required: true },
    websiteLink: { type: String },
    aboutProject: { type: String, required: true },
    estimatedDeadline: { type: String },
    status: { type: String, required: true },
    description: { type: String, required: true },
    additionalInfo: { type: String, required: true },
    projectWorkspaces: [{
        name: { type: String },
        link: { type: String }
    }],
    manageTeamOrProject: [{
        title: { type: String, required: true },
        techStack: { type: String }
    }]
});

mongoose.model('User', UserTable);
mongoose.model('Project', ProjectInfomation);