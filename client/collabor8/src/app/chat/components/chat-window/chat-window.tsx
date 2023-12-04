import VStack from '@/components/ui/v-stack/v-stack';
import { TChat, TMessage } from '@/types/chat-types';
import './chat-window.css';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import { TUserInfo } from '@/types/types';

type ChatWindowProps = {
  chat: TChat;
  user: TUserInfo;
};
const socket = io('http://localhost:3001');

export default function ChatWindow({ chat, user }: ChatWindowProps) {
  const [messages, setMessages] = useState<TMessage[]>(chat.messages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handleNewMessage = (message: TMessage) => {
      console.log('message: ', message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setIsTyping(false);
    };
    socket.on('message', handleNewMessage);
    return () => {
      socket.off('message', handleNewMessage);
    };
  }, []);

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

  useEffect(() => {
    const handleEnterRoom = () => {
      if (user?._id && chat) {
        socket.emit('enterRoom', {
          room: chat._id,
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
      text: newMessage,
      userId: user?._id,
      userName: user?.userName,
      chatId: chat?._id,
      room: chat?._id,
    });
    setNewMessage('');
  };

  return (
    <VStack size="9col">
      <h2 className="h6">{chat.chatName}</h2>
      {chat.messages.map((message) => (
        <p key={message._id}>{message.text}</p>
      ))}
      {messages && (
        <>
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
    </VStack>
  );
}
