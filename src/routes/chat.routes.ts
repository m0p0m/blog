// routes/chat.routes.ts
import { Router } from 'express';
import { sendMessage, getChatHistory } from '../controllers/chat.controller';

const router = Router();

router.post('/send', sendMessage);
router.get('/history/:userId', getChatHistory);

export default router;