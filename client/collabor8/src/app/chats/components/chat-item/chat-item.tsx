import { getChatMessages } from '@/apiService/chatService';
import { TChat } from '@/types/chat-types';
import { Dispatch, SetStateAction, useState } from 'react';
import './chat-item.css';

type ChatItemProps = {
  chat: TChat;
  setOpenedChat: Dispatch<SetStateAction<TChat | null>>;
};

export default function ChatItem({ chat, setOpenedChat }: ChatItemProps) {
  const [counter, setCounter] = useState(chat.unreadCount || 0);
  const handleChatClick = () => {
    getChatMessages(chat._id).then((res) => {
      setOpenedChat({
        ...chat,
        messages: res?.data,
      });
    });
    setCounter(0);
  };
  return (
    <li className="chat-item" onClick={handleChatClick}>
      <div>
        <p className="chat-item__title">{chat.chatName}</p>

        {chat.lastMessage && (
          <p className="chat-item__text chat-item__text_header">
            {chat.lastMessage.userName}
          </p>
        )}
        <p className="chat-item__text">{chat.lastMessage.text}</p>
      </div>
      {counter !== 0 && <span className="chat-item__counter">{counter}</span>}
    </li>
  );
}
