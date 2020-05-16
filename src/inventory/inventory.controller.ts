import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import {
  IInventoryItem,
  IInventoryDocument,
} from './interfaces/inventory.interface';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AdminGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Inventory item has been successfully created.',
  })
  public async createInventoryItem(@Body() item: IInventoryItem) {
    return await this.inventoryService.createItem(item);
  }

  @Get()
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  public async getItems() {
    return await this.inventoryService.getAllInventory();
  }

  @Get('code/:itemCode')
  @HttpCode(HttpStatus.OK)
  public async getItemById(@Param('itemCode') code: string) {
    return await this.inventoryService.findByCode(code);
  }

  @Put()
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  public async updateItem(@Body() item: IInventoryDocument) {
    return await this.inventoryService.updateItem(item);
  }

  @Delete(':itemId')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  public async deleteItem(@Param('itemId') id: string) {
    return await this.inventoryService.deleteItem(id);
  }

  @Get('/mail-report')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  public async getReport(@Req() req) {
    return await this.inventoryService.generateReport(req.user.userId);
  }
}
