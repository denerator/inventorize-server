import 'dotenv/config';
import * as mongoose from 'mongoose';
import { MONGO_PROVIDER } from '../constants/providers';

export const databaseProviders = [
  {
    provide: MONGO_PROVIDER,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        // tslint:disable-next-line:max-line-length
        `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_USER_PASSWORD}@cluster0-vxrku.mongodb.net/test?retryWrites=true&w=majority`,
        { useFindAndModify: false, useNewUrlParser: true },
      ),
  },
];
