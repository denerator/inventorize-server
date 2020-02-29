import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { INVENTORY_PROVIDER } from '../constants/providers';
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
    const existingItem = await this.findByCode(item.code);
    if (existingItem) {
      throw new HttpException(
        'Item with this code already created',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.inventoryModel.create(item);
  }

  public async findByCode(code: string) {
    return await this.inventoryModel.findOne({ code });
  }

  public async getAllInventory() {
    return await this.inventoryModel.find();
  }

  public async getInventoryItemById(id: string) {
    return await this.inventoryModel.findById(id);
  }

  public async updateItem(item: IInventoryDocument) {
    const updateItem = await this.inventoryModel.findByIdAndUpdate(
      item._id,
      item,
    );
    if (!updateItem) {
      throw new HttpException('Item does not exist', HttpStatus.BAD_REQUEST);
    }
    return await this.inventoryModel.findById(item._id);
  }
}
