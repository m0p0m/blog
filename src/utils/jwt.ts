import jwt from 'jsonwebtoken';
import { ApiError } from './Response';

interface JwtPayload {
  userId: string;
}

export const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET as jwt.Secret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    } as jwt.SignOptions
  );
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as JwtPayload;
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired token');
  }
};