import { Document } from 'mongoose';

export interface IInventoryItem {
  name: string;
  price: number;
  amount: number;
  responsible: string;
  code: string;
}

export interface IInventoryDocument extends Document, IInventoryItem {}
