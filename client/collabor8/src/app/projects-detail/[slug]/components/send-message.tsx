import Button from '@/components/button/button';
import Input from '@/components/input/input';
import { FormEvent, useState } from 'react';
import './send-message.css';
import { startChat } from '@/apiService/chatService';
import Link from 'next/link';

type SendMessageProps = {
  projectOwnerId: string;
  projectTitle: string;
  userId: string;
  userName: string;
};

export default function SendMessage({
  projectOwnerId,
  projectTitle,
  userId,
  userName,
}: SendMessageProps) {
  const [message, setMessage] = useState('');
  const [messageWasSend, setMessageWasSend] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const chatInfo = {
      chatName: `${userName}-${projectTitle}`,
      users: [userId, projectOwnerId],
      message: message,
      userName,
    };
    startChat(chatInfo)
      .then(() => {
        setMessageWasSend(true);
        setMessage('');
      })
      .catch((e) => console.log('Error while starting chat', e));
  };

  return (
    <div className="send-message">
      <div className="send-message__header">
        <h2 className="h5">Send message to project owner</h2>
        <p className="bodytext2">
          You can ask any questions about the project.
        </p>
      </div>
      <div className="send-message__content">
        {messageWasSend ? (
          <p className="send-message__text">
            Message was successfully send.{' '}
            <Link className="send-message__link" href="/chats">
              Go to Chats
            </Link>
          </p>
        ) : (
          <form className="review__form" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="feedback"
              value={message}
              label="Your message"
              placeholder="Enter your message to the project owner"
              status="default"
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="primary" type="submit" label="Submit" />
          </form>
        )}
      </div>
    </div>
  );
}
