import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { Chat, Message } from '../models/chat';

export async function handleEnterChat(req: Request, res: Response) {
  try {
    const { chatName, users } = req.body;
    const existingChat = await Chat.findOne({ chatName });
    if (existingChat?._id) {
      res.status(200).send(existingChat);
    } else {
      const newChat = new Chat({ chatName, users });
      await newChat.save();
      res.status(200).send(newChat);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMsg: 'Internal server error.' });
  }
}

export async function addMessageToChat(messageData: any) {
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
