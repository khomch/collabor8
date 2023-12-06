import Button from '@/components/button/button';
import VStack from '@/components/ui/v-stack/v-stack';
import { TChat, TMessage } from '@/types/chat-types';
import { TUserInfo } from '@/types/types';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Message from '../message/message';
import './chat-window.css';
import { useDispatch } from '@/redux-store/customHooks';
import { fetchChats, readChatMessages } from '@/redux-store/slices/chatSlice';
import { BASE_URL } from '@/constants/api';

type ChatWindowProps = {
  chat: TChat;
  user: TUserInfo;
};
const socket = io(BASE_URL);

export default function ChatWindow({ chat, user }: ChatWindowProps) {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [whoIsTyping, setWhoIsTyping] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const handleNewMessage = (message: TMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setWhoIsTyping('');
      dispatch(fetchChats());
    };
    socket.on('message', handleNewMessage);
    return () => {
      socket.off('message', handleNewMessage);
    };
  }, [dispatch]);

  useEffect(() => {
    setMessages(chat.messages);
    dispatch(readChatMessages({ chatId: chat._id }));
  }, [chat, dispatch]);

  useEffect(() => {
    let activityTimer: any;
    socket.on('activity', (name) => {
      clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
        setWhoIsTyping('');
      }, 1000);
      setWhoIsTyping(name);
    });
    return () => {
      socket.off('activity', () => {
        setWhoIsTyping('');
      });
    };
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    socket.emit('activity', {
      name: user?.userName,
      chatId: chat._id,
    });
  };

  useEffect(() => {
    const handleEnterRoom = () => {
      if (user?._id && chat) {
        socket.emit('enterRoom', {
          chatId: chat._id,
          userId: user?._id,
        });
      }
    };
    handleEnterRoom();
    socket.on('enterRoom', handleEnterRoom);
    return () => {
      socket.off('enterRoom');
    };
  }, [user?._id, chat]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('message', {
      text: newMessage,
      userId: user?._id,
      userName: user?.userName,
      chatId: chat?._id,
      isRead: false,
    });
    setNewMessage('');
  };

  return (
    <VStack size="9col">
      <div className="chat-window">
        <h2 className="h6">{chat.chatName}</h2>
        {messages && (
          <>
            <div className="chat__messages">
              {messages
                .sort(
                  (a: TMessage, b: TMessage) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((message, index) => (
                  <Message key={index} message={message} userId={user?._id} />
                ))}
            </div>
            {whoIsTyping.length > 0 && (
              <p className="chat__istyping">{`${whoIsTyping} is typing...`}</p>
            )}
          </>
        )}
        <form onSubmit={sendMessage} className="chat__message-form">
          <input
            name="message"
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            className="chat__input"
            placeholder=""
            minLength={1}
            required
          />

          <Button variant="primary" label="Send" type="submit" />
        </form>
      </div>
    </VStack>
  );
}
