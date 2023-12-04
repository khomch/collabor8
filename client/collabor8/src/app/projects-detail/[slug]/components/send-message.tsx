import Button from '@/components/button/button';
import Input from '@/components/input/input';
import { FormEvent, useState } from 'react';
import './send-message.css';
import { startChat } from '@/apiService/chatService';

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
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const chatInfo = {
      chatName: `${userName}-${projectTitle}`,
      users: [userId, projectOwnerId],
      message: message,
      userName,
    };
    startChat(chatInfo);
    console.log(projectOwnerId, userId, message);
    setMessage('');
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
      </div>
    </div>
  );
}
