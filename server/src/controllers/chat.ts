import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { Chat, Message } from '../models/chat';
import { RequestWithUser } from './userDetails';

export async function handleStartChat(req: Request, res: Response) {
  try {
    const { chatName, users, message, userName } = req.body;
    const existingChat = await Chat.findOne({ chatName });
    if (existingChat?._id) {
      addMessageToChat({
        text: message,
        userId: users[0],
        userName,
        chatId: existingChat._id,
      });
      res.status(200).send(existingChat);
    } else {
      const newChat = new Chat({ chatName, users });
      await newChat.save();
      addMessageToChat({
        text: message,
        userId: users[0],
        userName,
        chatId: newChat._id,
      });
      res.status(200).send(newChat);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMsg: 'Internal server error.' });
  }
}

type TMessageData = {
  text: string;
  userId: string;
  userName: string;
  chatId: Types.ObjectId;
};

export async function addMessageToChat(messageData: TMessageData) {
  try {
    const newMessage = new Message(messageData);
    await newMessage.save();
    const chat = await Chat.findById(newMessage.chatId);
    chat?.messages.push(newMessage);
    chat?.save();

    console.log('Message added to chat successfully');
  } catch (error) {
    console.error('Error adding message to chat:', error);
  }
}

export async function getAllChats(req: RequestWithUser, res: Response) {
  try {
    const chats = await Chat.find({ users: { $in: [req.id] } });

    res.status(200).send(chats);
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMsg: 'Internal server error.' });
  }
}
