import mongoose from 'mongoose';
import { UserTable } from './schema';

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  userName: { type: String, required: true },
  chatId: { type: Schema.Types.ObjectId, required: true, ref: 'Chat' },
});
const ChatSchema = new Schema(
  {
    chatName: { type: String, required: true },
    messages: [MessageSchema],
    users: [{ type: Schema.Types.ObjectId, required: true, ref: 'User' }],
  },
  { timestamps: true }
);

export const Chat = mongoose.model('Chat', ChatSchema);
export const Message = mongoose.model('Message', MessageSchema);
