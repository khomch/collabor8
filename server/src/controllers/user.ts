import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/schema";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "test";

async function register(req: Request, res: Response) {
  try {
    const { emailAddress, userName, password, firstName, lastName } = req.body;
    const existingUser = await User.findOne({ emailAddress: emailAddress });

    if (existingUser) {
      return res
        .status(409)
        .send({ error: "409", errorMsg: "User already exists" });
    }

    if (password === "") throw new Error("Password is missing");

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      emailAddress: emailAddress,
      userName: userName,
      password: passwordHash,
      firstName: firstName,
      lastName: lastName,
    });

    const { _id } = await newUser.save();
    const accessToken = jwt.sign({ _id }, PRIVATE_KEY);

    res.status(201).send({
      message: `${userName} succesfully registered.`,
      token: accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMsg: "Internal server error." });
  }
}

async function login(req: Request, res: Response) {
  try {
    const credentials = {
      emailAddress: req.body.emailAddress,
      password: req.body.password,
    };
    const user = await User.findOne({ emailAddress: credentials.emailAddress });

    if (!user) {
      return res.status(401).send({ errorMsg: "User does not exist" });
    }

    const correctCredentials = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!correctCredentials) {
      return res.status(401).send({ errorMsg: "Invalid credentials" });
    } else {
      const accessToken = jwt.sign({ _id: user._id }, PRIVATE_KEY);
      res.status(200).send({
        message: `${user.userName} logged in.`,
        token: accessToken,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMsg: "Internal server error." });
  }
}

export default { register, login };
