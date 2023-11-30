import { Request, Response } from 'express';
import { Project } from '../models/schema';
import { TRole } from "../types";
import { RequestWithUser } from "./userDetails";


async function createProject(req: RequestWithUser, res: Response) {
  try {
    const newProject = new Project({
      projectOwnerId: req.id,
      title: req.body.title,
      link: req.body.link,
      aboutProject: req.body.aboutProject,
      estimatedDeadline: req.body.estimatedDeadline,
      type: req.body.type,
      description: req.body.description,
      additionalInfo: req.body.additionalInfo,
      level: req.body.level,
      techstack: req.body.techstack,
      projectWorkspaces: req.body.projectWorkspaces,
      openedRoles: req.body.openedRoles,
      status: "New Project"
    });

    const addProject = await newProject.save();
    res.status(201).send(addProject);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
}

async function editProjectDetails(req: RequestWithUser, res: Response) {
  try {
    const filter = { projectOwnerId: req.id, _id: req.body._id };
    const update = {
      title: req.body.title,
      link: req.body.link,
      aboutProject: req.body.aboutProject,
      estimatedDeadline: req.body.estimatedDeadline,
      type: req.body.type,
      description: req.body.description,
      additionalInfo: req.body.additionalInfo,
      level: req.body.level,
      techstack: req.body.techstack,
      projectWorkspaces: req.body.projectWorkspaces,
      openedRoles: req.body.openedRoles,
    };

    const projectDetails = await Project.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (!projectDetails) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(projectDetails);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
}

async function addRole(req: RequestWithUser, res: Response) {
  try {
    const filter = {
      projectOwnerId: req.id,
      _id: req.body.projectId,
    };
    const project = await Project.findOne(filter);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    project.openedRoles.push(req.body.newRoleData);
    project.save();
    res.status(201).send(project);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
}

async function removeRole(req: RequestWithUser, res: Response) {
  try {
    const filter = {
      projectOwnerId: req.id,
      _id: req.body.projectId,
    };
    const project = await Project.findOne(filter);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    const newRoles = project.openedRoles.filter(
      (role: TRole) => role._id !== req.body.roleToDeleteId
    );
    project.openedRoles = newRoles;
    project.save();
    res.status(200).send(project);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
}

async function getProjectDetails(req: Request, res: Response) {
  try {
    const project = await Project.findOne({ _id: req.params.id });
    const projectOwnerId = project.projectOwnerId;
    const user = await User.findOne({ _id: projectOwnerId });
    const firstName = user.firstName
    const lastName = user.lastName


    const projectWithOwnerName = {...project._doc,firstName,lastName}
    

    res.status(200).send(projectWithOwnerName);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
}

async function getAllProjectDetails(req: Request, res: Response) {
  try {
    const projects = await Project.find();
    res.status(200).send(projects);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
}
async function applyToProject(req: RequestWithUser, res: Response) {
  try {
    const filter = {
      _id: req.body.projectId,
    };
    const userId = req.id;
    const project = await Project.findOne(filter);
    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
    }
    const isAlreadyApplied = project.appliedUsers.some( (appliedId: string) => appliedId === userId )
    if (isAlreadyApplied) {
      return res.status(409).send({ message: 'User already applied' });
    }
    project.appliedUsers.push(userId);
    project.save();
    res.status(201).send(project);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
}
async function getProjectOwner(req: RequestWithUser, res: Response) {
  try {
    const project = await Project.find({ projectOwnerId: req.id });
    res.status(200).send(project);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
}

export default {
  createProject,
  editProjectDetails,
  getProjectDetails,
  getAllProjectDetails,
  addRole,
  removeRole,
  applyToProject,
  getProjectOwner,
};
