// controllers/chat.controller.ts
import { Request, Response } from 'express';
import ChatService from '../services/chat.service';
import { verifyToken } from '../utils/jwt';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = verifyToken(token);
    const userId = decoded.userId;
    const { receiverId, content } = req.body;

    const message = await ChatService.sendMessage(userId, receiverId, content);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
};

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = verifyToken(token);
    const userId = decoded.userId;
    const otherUserId = req.params.userId;

    const history = await ChatService.getChatHistory(userId, otherUserId);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error getting chat history', error });
  }
};

export const getPrivateChats = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = verifyToken(token);
    const userId = decoded.userId;
    console.log('Fetching private chats for user:', userId); 

    const privateChats = await ChatService.getPrivateChats(userId);
    res.status(200).json(privateChats);
  } catch (error) {
    res.status(500).json({ message: 'Error getting private chats', error });
  }
};