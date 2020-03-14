import {
  Injectable,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import {
  IUser,
  IDocumentUser,
  IUserRole,
} from 'src/user/interfaces/user.interface';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  async login(loginDTO: LoginDTO) {
    const user = await this.userService.getUserByEmail(loginDTO.email);
    if (user) {
      const isPasswordValid = await bcrypt.compare(
        loginDTO.password,
        user.password,
      );
      if (user && isPasswordValid) {
        const { password, ...result } = user;
        return { ...result, access_token: this.getAccessToken(user) };
      }
      throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('There is such user', HttpStatus.BAD_REQUEST);
  }

  public async createUser(user: IUser) {
    const existingUser = await this.userService.getUserByEmail(user.email);
    if (existingUser) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const password = await bcrypt.hash(user.password, 10);
    const dbUser = await this.userService.createUser({ ...user, password });
    return { ...dbUser.toObject(), access_token: this.getAccessToken(dbUser) };
  }

  private getAccessToken(user: IDocumentUser) {
    const { _id, role } = user;
    return this.jwt.sign({ sub: _id, role });
  }
}
