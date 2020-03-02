import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginDTO } from './dto/login.dto';
import { IUser } from '../user/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDTO: LoginDTO, @Res() res: Response) {
    const user = await this.authService.validateUser(loginDTO);
    return res.json(user);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  public async signUp(@Body() signUpDTO: IUser, @Res() res: Response) {
    const user = await this.authService.createUser(signUpDTO);
    return res.json(user);
  }
}
