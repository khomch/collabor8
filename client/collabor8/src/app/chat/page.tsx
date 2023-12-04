'use client';

import { getChats } from '@/apiService/chatService';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import { useSelector } from '@/redux-store/customHooks';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './chat.css';
import ChatList from './components/chat-list/chat-list';
import { TChat } from '@/types/chat-types';
import VStack from '@/components/ui/v-stack/v-stack';
import ChatWindow from './components/chat-window/chat-window';
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
  const [chats, setChats] = useState([]);
  const { user } = useSelector((state) => state.userState);
  const chat = 'soundHarbor';
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [chatData, setChatData] = useState<TChatData>();
  const [openedChat, setOpenedChat] = useState<TChat | null>(null);

  useEffect(() => {
    newMessage.length === 0 && setIsTyping(false);
  }, [newMessage]);

  useEffect(() => {
    getChats().then((res) => setChats(res?.data));
  }, []);

  // let activityTimer: any;

  // useEffect(() => {
  //   socket.on('activity', () => {
  //     clearTimeout(activityTimer);
  //     activityTimer = setTimeout(() => {
  //       setIsTyping(false);
  //     }, 1000);
  //     setIsTyping(true);
  //   });
  //   return () => {
  //     socket.off('activity', () => {
  //       setIsTyping(false);
  //     });
  //   };
  // }, []);

  // const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewMessage(e.target.value);
  //   socket.emit('activity', {
  //     name: user?.userName,
  //     chat: chat,
  //   });
  // };

  // useEffect(() => {
  //   const handleEnterRoom = () => {
  //     if (user?._id && chat) {
  //       socket.emit('enterRoom', {
  //         chat: chat,
  //       });
  //     }
  //   };
  //   handleEnterRoom();

  //   socket.on('enterRoom', handleEnterRoom);

  //   return () => {
  //     socket.off('enterRoom');
  //   };
  // }, [user?._id, chat, socket]);

  // const sendMessage = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   socket.emit('message', {
  //     userName: user?.userName,
  //     text: newMessage,
  //     chat: chat,
  //     userId: user?._id,
  //     chatName: chat,
  //     chatId: chatData?._id,
  //     users: [user?._id, projectOwnerId],
  //   });
  //   setNewMessage('');
  // };

  return (
    <div className="chat-page">
      <section className="chat">
        {/* {chatData && (
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
        )} */}
        {chats && (
          <VStack size="3col">
            <h2 className="h6">Chats</h2>
            <ChatList chats={chats} setOpenedChat={setOpenedChat} />
          </VStack>
        )}
        {user && openedChat && <ChatWindow chat={openedChat} user={user} />}
      </section>
    </div>
  );
}
