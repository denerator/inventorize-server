import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';
import { MONGO_PROVIDER, USER_PROVIDER } from '../constants/providers';
import { COLLECTIONS } from '../constants/collections';

export const userProviders = [
  {
    provide: USER_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model(COLLECTIONS.users, UserSchema),
    inject: [MONGO_PROVIDER],
  },
];
