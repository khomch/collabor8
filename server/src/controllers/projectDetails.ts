import { Request, Response } from 'express';
import { Project } from '../models/schema';
import { TRole } from '../types';

async function createProject(req: Request, res: Response) {
  try {
    const newProject = new Project({
      projectOwnerId: req.body.projectOwnerId,
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
    });

    const addProject = await newProject.save();
    res.status(201).send(addProject);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
}

async function editProjectDetails(req: Request, res: Response) {
  try {
    const filter = { projectOwnerId: req.body._id };
    const update = {
      projectOwnerId: req.body._id,
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
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(projectDetails);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
}

async function addRole(req: Request, res: Response) {
  try {
    const filter = {
      projectOwnerId: req.body.projectOwnerId,
      _id: req.body.projectId,
    };
    const project = await Project.findOne(filter);
    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
    }
    project.openedRoles.push(req.body.newRoleData);
    project.save();
    res.status(201).send(project);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
}

async function removeRole(req: Request, res: Response) {
  try {
    const filter = {
      projectOwnerId: req.body.projectOwnerId,
      _id: req.body.projectId,
    };
    const project = await Project.findOne(filter);
    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
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
    res.status(200).send(project);
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
async function applyToProject(req: Request, res: Response) {
  try {
    const filter = {
      _id: req.body.projectId,
    };
    const userId = req.body.userId;
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

export default {
  createProject,
  editProjectDetails,
  getProjectDetails,
  getAllProjectDetails,
  addRole,
  removeRole,
  applyToProject
};
