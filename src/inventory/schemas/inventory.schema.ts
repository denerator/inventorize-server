import * as mongoose from 'mongoose';

export const InventorySchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    amount: Number,
    responsible: String,
    code: String,
  },
  {
    timestamps: true,
    collection: 'inventory',
  },
);
