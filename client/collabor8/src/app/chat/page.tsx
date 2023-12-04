'use client';

import { getChats } from '@/apiService/chatService';
import VStack from '@/components/ui/v-stack/v-stack';
import { useDispatch, useSelector } from '@/redux-store/customHooks';
import { TChat } from '@/types/chat-types';
import { useEffect, useState } from 'react';
import './chat.css';
import ChatList from './components/chat-list/chat-list';
import ChatWindow from './components/chat-window/chat-window';
import { fetchChats } from '@/redux-store/slices/chatSlice';

export default function Chat() {
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.chatState);
  // const [chats, setChats] = useState<TChat[]>([]); // Provide the correct type for the initial state
  const { user } = useSelector((state) => state.userState);
  const [openedChat, setOpenedChat] = useState<TChat | null>(null);

  useEffect(() => {
    // getChats().then((res) => setChats(res?.data));
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className="chat-page">
      <section className="chat">
        {chats && chats?.length > 0 && user?._id && (
          <VStack size="3col">
            <h2 className="h6">Chats</h2>
            <ChatList
              chats={chats}
              setOpenedChat={setOpenedChat}
              userId={user?._id}
            />
          </VStack>
        )}
        {user && openedChat && <ChatWindow chat={openedChat} user={user} />}
      </section>
    </div>
  );
}
