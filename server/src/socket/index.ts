import { Server, Socket } from 'socket.io';
import { addMessageToChat, handleReadMessage } from '../controllers/chat';

export const connectWS = async (io: Server) => {
  io.on('connection', (socket: Socket) => {
    socket.on('enterRoom', async ({ chatId, userId }) => {
      const prevRoom = getUser(socket.id)?.room;
      if (prevRoom) {
        socket.leave(prevRoom);
      }

      const user = activateUser(socket.id, userId, chatId);

      if (prevRoom) {
        io.to(prevRoom).emit('userList', {
          users: getUsersInRoom(prevRoom),
        });
      }

      socket.join(user.room);
      handleReadMessage(chatId, userId);
    });

    socket.on('message', ({ userName, text, userId, chatId, isRead }) => {
      if (chatId) {
        addMessageToChat({ userId, userName, chatId, text, isRead })
          .then((message) => io.to(chatId).emit('message', message))
          .catch((err) =>
            console.log('Error while writing message to db', err)
          );
      }
    });

    socket.on('activity', ({ name, chatId }) => {
      if (chatId) {
        socket.broadcast.to(chatId).emit('activity', name);
      }
    });

    socket.on('disconnect', () => {
      const user = getUser(socket.id);
      userLeavesApp(socket.id);

      if (user) {
        io.to(user.room).emit('message', 'User left');

        io.to(user.room).emit('userList', {
          users: getUsersInRoom(user.room),
        });
      }
    });
  });
};

interface User {
  id: string;
  name: string;
  room: string;
}

class UsersState {
  static users: User[] = [];

  static setUsers(users: User[]): void {
    this.users = users;
  }
}

function activateUser(id: string, name: string, room: string): User {
  const user: User = { id, name, room };
  UsersState.setUsers([
    ...UsersState.users.filter((existingUser) => existingUser.id !== id),
    user,
  ]);
  return user;
}

function userLeavesApp(id: string): void {
  UsersState.setUsers(UsersState.users.filter((user) => user.id !== id));
}

function getUser(id: string): User | undefined {
  return UsersState.users.find((user) => user.id === id);
}

function getUsersInRoom(room: string): User[] {
  return UsersState.users.filter((user) => user.room === room);
}
