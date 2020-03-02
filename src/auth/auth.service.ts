import {
  Injectable,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { IUser } from '../user/interfaces/user.interface';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(loginDTO: LoginDTO) {
    const user = await this.userService.getUserByEmail(loginDTO.email);

    const isPasswordValid = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (user && isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);
  }

  public async createUser(user: IUser) {
    const password = await bcrypt.hash(user.password, 10);

    return await this.userService.createUser({ ...user, password });
  }
}
