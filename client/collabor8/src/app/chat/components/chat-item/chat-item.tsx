import { TChat } from '@/types/chat-types';
import './chat-item.css';
import { Dispatch, SetStateAction } from 'react';

type ChatItemProps = {
  chat: TChat;
  setOpenedChat: Dispatch<SetStateAction<TChat | null>>;
};

export default function ChatItem({ chat, setOpenedChat }: ChatItemProps) {
  const handleChatClick = () => {
    setOpenedChat(chat);
  };
  return (
    <li className="chat-item" onClick={handleChatClick}>
      {chat.chatName}
    </li>
  );
}
