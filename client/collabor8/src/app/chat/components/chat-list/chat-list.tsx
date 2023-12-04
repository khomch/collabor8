import { TChat } from '@/types/chat-types';
import './chat-list.css';
import ChatItem from '../chat-item/chat-item';
import { Dispatch, SetStateAction } from 'react';

type ChatListProps = {
  chats: TChat[];
  setOpenedChat: Dispatch<SetStateAction<TChat | null>>;
};

export default function ChatList({ chats, setOpenedChat }: ChatListProps) {
  return (
    <ul className="chat-list">
      {chats.map((chat: TChat) => (
        <ChatItem chat={chat} key={chat._id} setOpenedChat={setOpenedChat} />
      ))}
    </ul>
  );
}
