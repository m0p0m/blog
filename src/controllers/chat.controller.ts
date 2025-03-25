import { Request, Response } from "express";
import ChatService from "../services/chat.service";

class ChatController {
  async getMessages(req: Request, res: Response) {
    try {
      const { user1, user2 } = req.params;
      const messages = await ChatService.getMessages(user1, user2);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving messages" });
    }
  }
}

export default new ChatController();
