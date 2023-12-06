import { TChat } from '@/types/chat-types';
import './chat-list.css';
import ChatItem from '../chat-item/chat-item';
import { Dispatch, SetStateAction } from 'react';
import { useSelector } from '@/redux-store/customHooks';

type ChatListProps = {
  setOpenedChat: Dispatch<SetStateAction<TChat | null>>;
  userId: string;
};

export default function ChatList({ setOpenedChat, userId }: ChatListProps) {
  const { chats } = useSelector((state) => state.chatState);

  return (
    <ul className="chat-list">
      {chats &&
        chats.map((chat: TChat) => (
          <div key={chat._id}>
            <ChatItem chat={chat} setOpenedChat={setOpenedChat} />
          </div>
        ))}
    </ul>
  );
}
