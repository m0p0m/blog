import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import { initChatSocket } from './sockets/chat';
import { config } from 'dotenv';
import { connectDB } from './config/db';

config();

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

initChatSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
