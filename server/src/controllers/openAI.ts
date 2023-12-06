import { RequestWithUser } from './userDetails';
import OpenAI from 'openai';
import { Response } from 'express';
import dotenv from 'dotenv';
import { Project } from '../models/schema';
import { TProjectInfo } from '../types';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'My Api Key',
});

const generatePrompt = (params: string) => {
  return `I want to create a project with the following parameters ${params}.
            Return list of 5 roles of tech team and their techstack.
            Do not include any explanations, only provide a  RFC8259 compliant JSON response following this format without deviation in format but with different data.
            [{"id":"generate random id", "role": "title of the position", techstack: ["technology", "technology"]}]. 
            Delete all text except the JSON.`;
};

const createParamsFromDesctiption = (project: TProjectInfo) => {
  return `Project title: ${project.title}, 
    About project: ${project.aboutProject},
    Project description: ${project.description},
    Project additional info: ${project.additionalInfo},
    Project deadline: ${project.estimatedDeadline},
    `;
};

async function generateResponse(projectId: string) {
  const project = await Project.findById(projectId);
  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: generatePrompt(createParamsFromDesctiption(project)),
      },
    ],
  };
  const chatCompletion: OpenAI.Chat.ChatCompletion =
    await openai.chat.completions.create(params);
  return chatCompletion.choices[0].message.content;
}

export async function generateRoles(req: RequestWithUser, res: Response) {
  try {
    const response = await generateResponse(req.body.projectId);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMsg: 'Internal server error.' });
  }
}
