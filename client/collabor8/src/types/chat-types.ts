export type TMessage = {
  _id: string;
  text: string;
  userId: string;
  userName: string;
  chatId: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TChat = {
  _id: string;
  chatName: string;
  users: string[];
  messages: TMessage[];
  createdAt: string;
  updatedAt: string;
  unreadCount: number;
  lastMessage: TMessage;
};
