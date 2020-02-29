import { Connection } from 'mongoose';
import { InventorySchema } from './schemas/inventory.schema';
import { MONGO_PROVIDER, INVENTORY_PROVIDER } from '../constants/providers';
import { COLLECTIONS } from '../constants/collections';

export const inventoryProviders = [
  {
    provide: INVENTORY_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model(COLLECTIONS.inventory, InventorySchema),
    inject: [MONGO_PROVIDER],
  },
];
