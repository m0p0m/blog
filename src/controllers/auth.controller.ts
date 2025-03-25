import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth.service';
import { apiResponse } from '../utils/Response';

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData = req.body;
    const user = await AuthService.register(userData);
    apiResponse(res, 201, 'User registered successfully', user);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.login({ email, password });
    apiResponse(res, 200, 'Login successful', user);
  } catch (error) {
    next(error);
  }
};


export const logoutUser = (req: Request, res: Response): void => {
  res.clearCookie('token');
  apiResponse(res, 200, 'Logged out successfully');
};
