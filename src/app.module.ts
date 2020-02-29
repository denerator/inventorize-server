import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './utils/logger.util';

@Module({
  imports: [InventoryModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
