import { Response } from 'express';

interface ApiResponseOptions {
  statusCode: number;
  message: string;
  data?: any;
  errors?: any[];
}

export class ApiError extends Error {
  statusCode: number;
  errors: any[];

  constructor(statusCode: number, message: string, errors: any[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export const apiResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any
) => {
  res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data,
  });
};