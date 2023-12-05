import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { Chat, Message } from '../models/chat';
import { RequestWithUser } from './userDetails';

const buildMessage = (messageData: TMessageData) => {
  const { text, userId, userName, chatId, isRead } = messageData;
  return { text, userId, userName, chatId, isRead };
};

export async function handleStartChat(req: Request, res: Response) {
  try {
    const { chatName, users, message, userName } = req.body;
    const newChatData = {
      text: message,
      userId: users[0],
      userName,
      isRead: false,
    };
    const existingChat = await Chat.findOne({ chatName });
    if (existingChat?._id) {
      addMessageToChat({ ...newChatData, chatId: existingChat._id });
      res.status(200).send(existingChat);
    } else {
      const newChat = new Chat({ chatName, users });
      await newChat.save();
      addMessageToChat({ ...newChatData, chatId: newChat._id });
      res.status(201).send(newChat);
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
  isRead: boolean;
};

export async function addMessageToChat(messageData: TMessageData) {
  try {
    const newMessage = new Message(messageData);
    await newMessage.save();
    const chat = await Chat.findById(newMessage.chatId);
    if (chat) {
      chat.messages.push(newMessage._id);
      const unreadCount = await Message.countDocuments({
        chatId: newMessage.chatId,
        isRead: false,
      });
      chat.unreadCount = unreadCount;
      await chat.save();
    }
    return newMessage;
  } catch (error) {
    console.error('Error adding message to chat:', error);
  }
}

export async function handleReadMessage(chatId: string, recieverId: string) {
  try {
    await Message.updateMany(
      {
        chatId: chatId,
        isRead: false,
        userId: { $ne: recieverId },
      },
      {
        $set: {
          isRead: true,
        },
      },
      { new: true }
    );
  } catch (error) {
    console.error('Error handling read message:', error);
  }
}

export async function getAllChats(req: RequestWithUser, res: Response) {
  try {
    const chats = await Chat.find({ users: { $in: [req.id] } });
    const newArr = await Promise.all(
      chats.map(async (chat: any) => {
        const count = await Message.countDocuments({
          chatId: chat._id,
          isRead: false,
          userId: { $ne: req.id },
        });
        chat.unreadCount = count;
        chat.lastMessage = await Message.findById(
          chat.messages[chat.messages.length - 1]
        );
        return chat;
      })
    );
    res.status(200).send(newArr);
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMsg: 'Internal server error.' });
  }
}

export async function getChatMessages(req: RequestWithUser, res: Response) {
  try {
    const messages = await Message.find({ chatId: req.params.id });
    res.status(200).send(messages);
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMsg: 'Internal server error.' });
  }
}
