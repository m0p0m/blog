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

  async getPrivateChats(userId: string) {
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [{ senderId: userId }, { receiverId: userId }],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$senderId", userId] },
              "$receiverId",
              "$senderId",
            ],
          },
          lastMessage: { $first: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          userId: "$_id",
          username: "$user.username",
          lastMessage: "$lastMessage.content",
          createdAt: "$lastMessage.createdAt",
        },
      },
    ]);
    console.log('Private chats for user', userId, ':', messages); 
    return messages;
  }
}

export default new ChatService();