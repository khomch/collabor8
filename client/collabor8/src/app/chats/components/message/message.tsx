import { TMessage } from '@/types/chat-types';
import './message.css';

type MessageProps = {
  message: TMessage;
  userId: string | undefined;
};

export default function Message({ message, userId }: MessageProps) {
  const date = new Date(message.createdAt).toLocaleString('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: '2-digit',
    year: '2-digit',
  });
  return (
    <li
      className={`message message_${
        userId === message.userId ? 'outgoing' : 'incoming'
      }`}
    >
      <p className="message__text">{message.text}</p>
      <p className="message__time">{date}</p>
    </li>
  );
}
