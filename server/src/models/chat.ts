import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    text: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    userName: { type: String, required: true },
    chatId: { type: Schema.Types.ObjectId, required: true, ref: 'Chat' },
    isRead: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);
const ChatSchema = new Schema(
  {
    chatName: { type: String, required: true },
    messages: [{ type: Schema.Types.ObjectId, required: true, ref: 'Message' }],
    users: [{ type: Schema.Types.ObjectId, required: true, ref: 'User' }],
    unreadCount: { type: Number, requred: true, default: 0 },
    lastMessage: { type: Object },
  },
  { timestamps: true }
);

export const Chat = mongoose.model('Chat', ChatSchema);
export const Message = mongoose.model('Message', MessageSchema);
