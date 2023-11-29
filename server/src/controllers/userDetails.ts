import { Request, Response } from 'express';
import { User } from '../models/schema';
import { Users } from '../types/type';
import jwt, { JwtPayload } from 'jsonwebtoken';
const PRIVATE_KEY = process.env.PRIVATE_KEY || 'test';

interface RequestWithUser extends Request {
  id?: string | number;
}

async function updateUserProfile(req: RequestWithUser, res: Response) {
  try {
    const update: Users = {
      userName: req.body.userName,
      emailAddress: req.body.emailAddress,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      website: req.body.website,
      company: req.body.company,
      github: req.body.github,
      profile: req.body.profile,
      role: req.body.role,
      bio: req.body.bio,
    };

    const userProfile = await User.findOneAndUpdate({ _id: req.id }, update, {
      new: true,
    });
    if (!userProfile) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(userProfile);
  } catch (error) {
    res.status(400).send();
  }
}

async function getUserProfile(req: RequestWithUser, res: Response) {
  try {
    const profile = await User.findOne({ _id: req.id });
    res.status(200).send(profile);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
}

export default { updateUserProfile, getUserProfile };
