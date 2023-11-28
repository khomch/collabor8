/* AUTHENTICATION MIDDLEWARE */
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/schema'
import { Request, Response, NextFunction } from 'express';
import cookie from 'cookie'; 

interface RequestWithUser extends Request {
    user: string | number;
}

const PRIVATE_KEY = process.env.PRIVATE_KEY || "test";

export async function authenticateToken(req: RequestWithUser, res: Response, next: NextFunction) {
    const cookies = cookie.parse(req.headers.cookie || ''); 
    const token = cookies['token']; 
    if(!token) return res.sendStatus(403);
    try {
      const decryptedToken = jwt.verify(token, PRIVATE_KEY);
      const _id = (decryptedToken as JwtPayload)?.sub;
      const user = await User.findById(_id);
      if (!user) return res.sendStatus(401);
      req.user = user;
      next();
    } catch (error) {
      res.sendStatus(401);
    }
}