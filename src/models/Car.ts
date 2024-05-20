import { User } from './User';

export interface Car {
  id?: number;
  plateNumber: string;
  user?: User;
  userId?: number;
  events?: any[];
  createdAt?: string;
  updatedAt?: string;
}
