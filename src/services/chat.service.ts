import Message, { IMessage } from "../models/message.model";

class ChatService {
    async saveMessage(sender: string, receiver: string, content: string) {
      const message = new Message({ sender, receiver, content });
      return await message.save();
    }
  
    async getMessages(user1: string, user2: string) {
      return await Message.find({
        $or: [
          { sender: user1, receiver: user2 },
          { sender: user2, receiver: user1 }
        ]
      }).sort({ createdAt: 1 });
    }
  
    async getUserChats(userId: string) {
      const messages = await Message.find({
        $or: [{ sender: userId }, { receiver: userId }]
      });
  
      const chatUsers = new Set<string>();
      messages.forEach((msg) => {
        chatUsers.add(msg.sender);
        chatUsers.add(msg.receiver);
      });
  
      chatUsers.delete(userId);
      return Array.from(chatUsers);
    }
  }

  
export default new ChatService();
