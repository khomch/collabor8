import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// TODO import user model

const PRIVATE_KEY = process.env.PRIVATE_KEY;

async function register(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const existingUser = 'user' /* TODO find user in the DB */;
    if (existingUser) {
      return res.status(409).send({message: 'Username already exist'});
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = 'new user' /* TODO create new user and save it in DB */;

    // const token = jwt.sign({ userId: newUser._id, username: newUser.username }, PRIVATE_KEY);

    // res.cookie('accessToken', token);
    res.status(201).send({username});
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error: '})
  }
}

export default { register };
