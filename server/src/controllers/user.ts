import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// TODO import user model once set

const PRIVATE_KEY = process.env.PRIVATE_KEY;

async function register(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const existingUser = 'user' /* await User.findOne({ username });*//* TODO uncomment when model is imported*/;
    if (existingUser) {
      return res.status(409).send({message: 'Username already exist'});
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = 'new user' /* TODO set new user when model is imported */;

    // await newUser.save(); /* TODO uncomment when newUser is set */

    // TODO authentication bits
    // const token = jwt.sign({ userId: newUser._id, username: newUser.username }, PRIVATE_KEY);
    // res.cookie('accessToken', token);

    res.status(201).send({username});
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error.'})
  }
}

async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const user = 'someuser' /* await User.findOne({ username });*//*TODO uncomment when model is imported */
    if(!user) {
      return res.status(401).send({message: 'User does not exist'});
    }
    const correctCredentials = await bcrypt.compare(
      password,
      user/*.passwordHash*/ /*TODO uncomment when we get user from DB */
    );

    // TODO autentication bits
    // const token = jwt.sign({ userId: user._id, username: user.username }, PRIVATE_KEY);
    // res.cookie('accessToken', token);

    res.status(200).send({/* TODO put username and user _id here */})
  } catch (error) {
    console.log(error);
    res.status(500).send({message: 'Internal Server Error.'})
  }
}

export default { register, login };