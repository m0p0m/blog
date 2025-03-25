import { Router, Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/auth.controller';

const router = Router();

const allowOnlyPost = (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  next();
};
router.post('/register', allowOnlyPost, registerUser);
router.post('/login', allowOnlyPost, loginUser);
router.post('/logout', allowOnlyPost, logoutUser);

export default router;
