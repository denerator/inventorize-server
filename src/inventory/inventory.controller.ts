import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Res,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { InventoryService } from './inventory.service';
import {
  IInventoryItem,
  IInventoryDocument,
} from './interfaces/inventory.interface';
import { ApiResponse } from '@nestjs/swagger';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Inventory item has been successfully created.',
  })
  public async createInventoryItem(
    @Body() item: IInventoryItem,
    @Res() res: Response,
  ) {
    const data = await this.inventoryService.createItem(item);
    res.json(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getItems(@Res() res: Response) {
    const data = await this.inventoryService.getAllInventory();
    res.json(data);
  }

  @Get(':itemCode')
  @HttpCode(HttpStatus.OK)
  public async getItemById(
    @Param('itemCode') code: string,
    @Res() res: Response,
  ) {
    const data = await this.inventoryService.findByCode(code);
    res.json(data);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  public async updateItem(
    @Body() item: IInventoryDocument,
    @Res() res: Response,
  ) {
    const data = await this.inventoryService.updateItem(item);
    res.json(data);
  }

  @Delete(':itemId')
  @HttpCode(HttpStatus.OK)
  public async deleteItem(@Param('itemId') id: string, @Res() res: Response) {
    const data = await this.inventoryService.deleteItem(id);
    res.json(data);
  }
}
