import { Request, Response } from "express";
import { User } from '../models/schema';

async function userInfomation(req: Request, res: Response) {
  try {
    const filter = { emailAddress: req.body.emailAddress };
    const update = {
      userName: req.body.userName,
      emailAddress: req.body.emailAddress,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      website: req.body.website,
      company: req.body.company,
      github: req.body.github,
      profile: req.body.bio,
      role: req.body.role,
    };

    const userProfile = await User.findOneAndUpdate(filter, update, { new: true });

    if (!userProfile) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(userProfile);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
}

async function userProfile(req: Request, res: Response) {
  try {
    const profile = await User.findOne({ _id: req.body.id });
    res.status(201).send(profile);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
}

export default { userInfomation, userProfile };