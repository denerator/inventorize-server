import { Injectable, Inject } from '@nestjs/common';
import { USER_PROVIDER } from '../constants/providers';
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
    return await this.userModel.findOne({ email: email.trim().toLowerCase() }).lean().exec();
  }

  public async getOneUser(params: Partial<IDocumentUser>) {
    return await this.userModel.findOne(params).lean().exec();
  }
}
