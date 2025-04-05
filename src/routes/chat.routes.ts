// routes/chat.routes.ts
import { Router } from 'express';
import { sendMessage, getChatHistory, getPrivateChats } from '../controllers/chat.controller';

const router = Router();

router.post('/send', sendMessage);
router.get('/history/:userId', getChatHistory);
router.get('/private', getPrivateChats);

export default router;