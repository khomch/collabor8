/* AUTHENTICATION MIDDLEWARE */
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/schema'
import { Request, Response, NextFunction } from 'express';

interface RequestWithUser extends Request {
    id?: string | number;
}

const PRIVATE_KEY = process.env.PRIVATE_KEY || "test";

export async function authenticateToken(req: RequestWithUser, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if(!token) return res.sendStatus(403);

    try {
      const decryptedToken = jwt.verify(token, PRIVATE_KEY) as JwtPayload;
      const _id = decryptedToken._id;
      // const user = await User.findById(_id);
      // if (!user) return res.sendStatus(401);
      req.id = _id;
      next();
    } catch (error) {
      res.sendStatus(401);
    }
}