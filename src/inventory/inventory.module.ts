import { Module } from '@nestjs/common';
import { MailerModule } from '@nest-modules/mailer';
import { transporter } from '../utils/transporter.util';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { inventoryProviders } from './inventory.provider';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    DatabaseModule,
    MailerModule.forRoot({ ...transporter }),
    UserModule,
  ],
  controllers: [InventoryController],
  providers: [InventoryService, ...inventoryProviders],
})
export class InventoryModule {}
