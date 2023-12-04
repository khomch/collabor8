import { TChat } from '@/types/chat-types';
import './chat-list.css';
import ChatItem from '../chat-item/chat-item';
import { Dispatch, SetStateAction } from 'react';

type ChatListProps = {
  chats: TChat[];
  setOpenedChat: Dispatch<SetStateAction<TChat | null>>;
  userId: string;
};

export default function ChatList({
  chats,
  setOpenedChat,
  userId,
}: ChatListProps) {
  return (
    <ul className="chat-list">
      {chats &&
        chats.map((chat: TChat) => (
          <div key={chat._id}>
            <ChatItem
              chat={chat}
              setOpenedChat={setOpenedChat}
              userId={userId}
            />
          </div>
        ))}
    </ul>
  );
}
