import { Request, Response } from "express";
import { Project } from '../models/schema';

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
      projectWorkspaces: req.body.projectWorkspaces,
      manageTeam: req.body.manageTeam,
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
      projectWorkspaces: req.body.projectWorkspaces,
      manageTeam: req.body.manageTeam,
    };

    const projectDetails = await Project.findOneAndUpdate(filter, update, { new: true });

    if (!projectDetails) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(projectDetails);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
}

async function getProjectDetails(req: Request, res: Response) {
    try {
      const project = await Project.findOne({ projectOwnerId: req.params.id });
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

export default { createProject, editProjectDetails, getProjectDetails, getAllProjectDetails };