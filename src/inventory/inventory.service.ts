import { Injectable, Inject } from '@nestjs/common';
import { INVENTORY_PROVIDER } from 'src/constants/providers';
import { Model } from 'mongoose';
import {
  IInventoryDocument,
  IInventoryItem,
} from './interfaces/inventory.interface';

@Injectable()
export class InventoryService {
  constructor(
    @Inject(INVENTORY_PROVIDER)
    private readonly inventoryModel: Model<IInventoryDocument>,
  ) {}

  public async createItem(item: IInventoryItem) {
    return await this.inventoryModel.create(item);
  }

  public async getAllInventory() {
    return await this.inventoryModel.find();
  }

  public async getInventoryItemById(id: string) {
    return await this.inventoryModel.findById(id);
  }

  public async updateItem(item: IInventoryDocument) {
    await this.inventoryModel.findByIdAndUpdate(item._id, item);
    return await this.inventoryModel.findById(item._id);
  }
}
