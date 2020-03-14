import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { IUser } from '../user/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDTO: LoginDTO) {
    const user = await this.authService.login(loginDTO);
    return user;
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  public async signUp(@Body() signUpDTO: IUser) {
    const user = await this.authService.createUser(signUpDTO);
    return user;
  }
}
