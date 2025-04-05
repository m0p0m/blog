// sockets/chat.ts
import { Server, Socket } from 'socket.io';
import Message from '../models/message.model';
import { verifyToken } from '../utils/jwt';
import ChatService from '../services/chat.service';

export const initChatSocket = (io: Server) => {
  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error'));

    try {
      const decoded = verifyToken(token);
      socket.data.userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', (otherUserId: string) => {
      const room = [socket.data.userId, otherUserId].sort().join('_');
      socket.join(room);
    });

    socket.on('sendMessage', async ({ receiverId, content }) => {
      const message = await ChatService.sendMessage(socket.data.userId, receiverId, content);
      const room = [socket.data.userId, receiverId].sort().join('_');
      io.to(room).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};