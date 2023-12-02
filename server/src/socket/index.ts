import { Server, Socket } from 'socket.io';
import { addMessageToChat } from '../controllers/chat';

const ADMIN = 'Admin';

export const connectWS = async (io: Server) => {
  io.on('connection', (socket: Socket) => {
    socket.emit(
      'message',
      buildMsg({ userName: ADMIN, text: 'Welcome to chat App' })
    );

    socket.on('enterRoom', async ({ chat }) => {
      socket.join(chat);
    });

    socket.on('message', ({ userName, text, chat, userId, chatId }) => {
      if (chat) {
        io.to(chat).emit('message', { userId, userName, chatId, text });
        addMessageToChat({
          text,
          userId,
          userName,
          chatId,
        });
      }
    });

    socket.on('activity', ({ name, chat }) => {
      if (chat) {
        socket.broadcast.to(chat).emit('activity', name);
      }
    });
  });
};

type TBuildMsg = {
  userId?: string;
  userName: string;
  chatId?: string;
  text: string;
};

const buildMsg = ({
  userId = '1',
  userName,
  chatId = '1',
  text,
}: TBuildMsg) => {
  return {
    text,
    userId,
    userName,
    chatId,
  };
};
