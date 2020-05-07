import 'dotenv/config';
import * as mongoose from 'mongoose';
import { MONGO_PROVIDER } from '../constants/providers';

export const databaseProviders = [
  {
    provide: MONGO_PROVIDER,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        // tslint:disable-next-line:max-line-length
        `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_USER_PASSWORD}@cluster0-shard-00-00-vxrku.mongodb.net:27017,cluster0-shard-00-01-vxrku.mongodb.net:27017,cluster0-shard-00-02-vxrku.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`,
        { useFindAndModify: false, useNewUrlParser: true },
      ),
  },
];
