import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './utils/logger.util';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [InventoryModule, AuthModule, UserModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
