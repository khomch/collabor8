'use client';

import VStack from '@/components/ui/v-stack/v-stack';
import { useSelector } from '@/redux-store/customHooks';
import { TChat } from '@/types/chat-types';
import Link from 'next/link';
import { useState } from 'react';
import './chat.css';
import ChatList from './components/chat-list/chat-list';
import ChatWindow from './components/chat-window/chat-window';

export default function Chat() {
  const { chats } = useSelector((state) => state.chatState);
  const { user } = useSelector((state) => state.userState);
  const [openedChat, setOpenedChat] = useState<TChat | null>(null);

  return (
    <div className="chat-page">
      {chats && chats?.length > 0 ? (
        <section className="chat">
          {user?._id && (
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
      ) : (
        <p className="chat-page__no-chats">
          No chats yet. Write to the project owner to start a chat.{' '}
          <Link className="chat-page__link" href="/dashboard">
            Explore projects
          </Link>
        </p>
      )}
    </div>
  );
}
