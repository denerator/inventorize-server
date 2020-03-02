import { Document } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: IUserRole;
  password: string;
}

export interface IDocumentUser extends IUser, Document {}

export type IUserRole = 'admin' | 'user';
