import { Request, Response } from 'express';
import { User } from '../models/schema';
import { Review } from '../types/type';
const PRIVATE_KEY = process.env.PRIVATE_KEY || 'test';

interface RequestWithUser extends Request {
  id?: string | number;
}

async function writeReview(req: RequestWithUser, res: Response) {
  try {
    const fromUser = await User.findOne({ _id: req.id });
    const update: Review = {
      toUserId: req.body.toUserId,
      rating: req.body.rating,
      feedback: req.body.feedback,
      fromUser: fromUser.userName,
    };

    const filter = { _id: update.toUserId };

    const updateReview = await User.updateOne(filter, {
      $push: {
        'profile.reviews': {
          rating: req.body.rating,
          feedback: req.body.feedback,
          fromUserName: fromUser.userName,
        },
      },
    });

    if (!updateReview) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(updateReview);
  } catch (error) {
    console.log('testttß', error);
    res.status(400).send();
  }
}

export default { writeReview };
