import { Request, Response } from "express";
import { User } from '../models/schema';
import { Users } from "../types/type";
import jwt, { JwtPayload } from "jsonwebtoken";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "test";

async function updateUserProfile(req: Request, res: Response) {
  try {
    const token: any = req.headers.authorization;
    const decryptedToken = jwt.verify(token, PRIVATE_KEY);
    const _id = (decryptedToken as JwtPayload)?._id;
    const filter = { _id };

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

    const userProfile = await User.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (!userProfile) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(userProfile);
  } catch (error) {
    res.status(400).send();
  }
}

async function getUserProfile(req: Request, res: Response) {
    const token: any = req.headers.authorization;
    const decryptedToken = jwt.verify(token, PRIVATE_KEY);
    const _id = (decryptedToken as JwtPayload)?._id;
    const profile = await User.findOne({ _id });
    res.status(201).send(profile);
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
}

export default { updateUserProfile, getUserProfile };