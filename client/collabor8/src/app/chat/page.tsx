'use client';

import Button from '@/components/button/button';
import './chat.css';
import Input from '@/components/input/input';
import { FormEvent, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from '@/redux-store/customHooks';
import { enterChat } from '@/apiService/chatService';
const socket = io('http://localhost:3001');

type TMessage = {
  text: string;
  userId: string;
  userName: string;
  chatId: string;
};

type TChatData = {
  _id: string;
  chatName: string;
  createdAt: string;
  messages: TMessage[];
  updatedAt: string;
  users: string[];
};

const projectOwnerId = '6569c6a7e1e67fe291d39b10';

export default function Chat() {
  const { user } = useSelector((state) => state.userState);
  const chat = 'soundHarbor';
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [chatData, setChatData] = useState<TChatData>();

  useEffect(() => {
    const handleNewMessage = (message: TMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setIsTyping(false);
    };
    socket.on('message', handleNewMessage);
    return () => {
      socket.off('message', handleNewMessage);
    };
  }, []);

  useEffect(() => {
    newMessage.length === 0 && setIsTyping(false);
  }, [newMessage]);

  let activityTimer: any;

  useEffect(() => {
    socket.on('activity', () => {
      clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
      setIsTyping(true);
    });
    return () => {
      socket.off('activity', () => {
        setIsTyping(false);
      });
    };
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    socket.emit('activity', {
      name: user?.userName,
      chat: chat,
    });
  };

  const handleStartChat = () => {
    user?._id &&
      enterChat({
        chatName: chat,
        users: [user?._id, projectOwnerId],
      }).then((res) => {
        setChatData(res);
        setMessages(res.messages);
      });
  };

  useEffect(() => {
    const handleEnterRoom = () => {
      if (user?._id && chat) {
        socket.emit('enterRoom', {
          chat: chat,
        });
      }
    };
    handleEnterRoom();

    socket.on('enterRoom', handleEnterRoom);

    return () => {
      socket.off('enterRoom');
    };
  }, [user?._id, chat, socket]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('message', {
      userName: user?.userName,
      text: newMessage,
      chat: chat,
      userId: user?._id,
      chatName: chat,
      chatId: chatData?._id,
      users: [user?._id, projectOwnerId],
    });
    setNewMessage('');
  };

  return (
    <div className="chat-page">
      <section className="chat">
        {user && (
          <Button
            variant="primary"
            label="Start chat"
            onClick={handleStartChat}
            type="button"
          />
        )}
        {chatData && (
          <>
            <h1>Chats</h1>
            <form className="form__join">
              <h2 className="h6">You — {user?.userName}</h2>
            </form>
            <div>
              {messages.map((message, index) => {
                return (
                  <div key={index}>
                    {message.userName}: {message.text}
                  </div>
                );
              })}
            </div>
            <form onSubmit={sendMessage} className="chat__message">
              <Input
                name="message"
                type="text"
                value={newMessage}
                onChange={handleOnChange}
                placeholder="..."
              />
              {isTyping && <p>Typing...</p>}
              <Button variant="blue" label="Send" type="submit" />
            </form>
          </>
        )}
      </section>
    </div>
  );
}
