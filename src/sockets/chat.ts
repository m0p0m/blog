import { Server, Socket } from "socket.io";
import ChatService from "../services/chat.service";
import redisClient from "../config/redis";

class ChatSocket {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.io.on("connection", this.handleConnection.bind(this));
  }

  private async handleConnection(socket: Socket) {
    console.log(`User connected: ${socket.id}`);

    socket.on("join", async (userId: string) => {
      socket.join(userId);
      await redisClient.set(`online:${userId}`, "true");
      this.io.emit("userOnline", userId);
      console.log(`User ${userId} is online`);
    });

    socket.on("sendMessage", async (data) => {
      const { sender, receiver, content } = data;
      const message = await ChatService.saveMessage(sender, receiver, content);
      
      const isReceiverOnline = await redisClient.get(`online:${receiver}`);
      if (isReceiverOnline) {
        this.io.to(receiver).emit("newMessage", message);
      }
      this.io.to(sender).emit("newMessage", message);
    });

    socket.on("disconnect", async () => {
      console.log(`User disconnected: ${socket.id}`);
      await redisClient.del(`online:${socket.id}`);
      this.io.emit("userOffline", socket.id);
    });
  }
}

export default ChatSocket;
