import { Server, Socket } from 'socket.io';
import { addMessageToChat } from '../controllers/chat';

const ADMIN = 'Admin';

export const connectWS = async (io: Server) => {
  io.on('connection', (socket: Socket) => {
    socket.emit(
      'message',
      buildMsg({ userName: ADMIN, text: 'Welcome to room App' })
    );

    socket.on('enterRoom', async ({ room }) => {
      socket.join(room);
    });

    socket.on('message', ({ userName, text, room, userId, chatId }) => {
      if (room) {
        io.to(room).emit('message', { userId, userName, chatId, text });
        addMessageToChat({ userId, userName, chatId, text });
      }
    });

    socket.on('activity', ({ name, room }) => {
      if (room) {
        socket.broadcast.to(room).emit('activity', name);
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
