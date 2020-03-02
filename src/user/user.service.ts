import { Injectable, Inject } from '@nestjs/common';
import { USER_PROVIDER } from 'src/constants/providers';
import { Model } from 'mongoose';
import { IDocumentUser, IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_PROVIDER)
    private readonly userModel: Model<IDocumentUser>,
  ) {}

  public async createUser(user: IUser) {
    return await this.userModel.create(user);
  }

  public async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email }).lean().exec();
  }
}
