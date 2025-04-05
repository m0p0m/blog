// services/chat.service.ts
import Message from '../models/message.model';

class ChatService {
  async sendMessage(senderId: string, receiverId: string, content: string) {
    const message = new Message({
      senderId,
      receiverId,
      content,
    });
    return await message.save();
  }

  async getChatHistory(userId: string, otherUserId: string) {
    return await Message.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });
  }
}

export default new ChatService();