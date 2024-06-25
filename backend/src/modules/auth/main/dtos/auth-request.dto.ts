import { Request } from 'express';

export interface AuthRequest extends Request {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}
