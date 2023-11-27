import { Request, Response } from "express";
import { Project } from '../models/schema';

async function CreateProject(req:Request,res:Response) {
    try {
    console.log(req.body)
    const newProject = new Project ({
        projectOwnerId:req.body.projectOwnerId,
        title:req.body.title,
        link:req.body.link,
        aboutProject:req.body.aboutProject,
        estimatedDeadline:req.body.estimatedDeadline,
        type:req.body.type,
        description:req.body.description,
        additionalInfo:req.body.additionalInfo,
        projectWorkspaces:req.body.projectWorkspaces,
        manageTeam:req.body.manageTeam
    }) 

    const AddProject = await newProject.save()
    res.status(201).send(AddProject)

    } catch (error) {
        console.log(error)
        res.status(400).send();  
    }
}

async function EditProjectDetails(req:Request,res:Response){
try {

    const filter = {projectOwnerId:req.body._id}
    const update = {
        projectOwnerId:req.body._id,
        title:req.body.title,
        link:req.body.link,
        aboutProject:req.body.aboutProject,
        estimatedDeadline:req.body.estimatedDeadline,
        type:req.body.type,
        description:req.body.description,
        additionalInfo:req.body.additionalInfo,
        projectWorkspaces:req.body.projectWorkspaces,
        manageTeam:req.body.manageTeam
    }

    const ProjectDetails = await Project.findOneAndUpdate(filter, update, { new: true })

    if (!ProjectDetails) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.status(200).send(ProjectDetails);
    
} catch (error) {
    console.log(error);
    res.status(400).send()
}
}

async function GetProjectDetails(req: Request, res:Response) {
    try {
        console.log(req.body)
        const project = await Project.findOne({ projectOwnerId:req.body._id });
        res.status(201).send(project);
      } catch (error) {
        console.log(error);
        res.status(400).send();
      }
}

async function GetAllProjectDetails(req:Request,res:Response){
    try {
        const projects = await Project.find();
        res.status(200).send(projects);        
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
}



export default {CreateProject, EditProjectDetails, GetProjectDetails, GetAllProjectDetails}