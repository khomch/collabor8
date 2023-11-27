import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/schema';

const PRIVATE_KEY = process.env.PRIVATE_KEY || "test";

async function register(req: Request, res: Response) {
  try {
  
    const { emailAddress,userName,password,firstName,lastName  } = req.body;
    const existingUser = await User.findOne({ emailAddress: emailAddress });

    if (existingUser) {
      return res.status(409).send({ error: '409', message: 'User already exists' });
    }

    if (password === '') throw new Error("Password is missing");
   
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      emailAddress: emailAddress,
      userName:userName,
      password: passwordHash, 
      firstName:firstName,
      lastName:lastName      
    });

    const { _id } = await newUser.save();    
    const accessToken = jwt.sign({ _id }, PRIVATE_KEY);

    res.status(201).send({ accessToken });
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'Could not create user' });
  }
}

async function login(req: Request, res: Response) {
  try {
    const credentials = {
      emailAddress: req.body.emailAddress,
      password: req.body.password
    }

    const user = await User.findOne({ emailAddress: credentials.emailAddress });
    
    if (!user || !user.passwordHash) {
      return res.status(401).send({ message: 'User does not exist' });
    }

    const correctCredentials = await bcrypt.compare(credentials.password, user.passwordHash);

    if (!correctCredentials) {
      return res.status(401).send({ message: 'Invalid credentials' });
    } else {
      const accessToken = jwt.sign({ _id: user._id }, PRIVATE_KEY);
      res.status(200).send({ accessToken });
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ error, message: 'An error occurred while logging in' });
  }
}

 export default { register,login };

