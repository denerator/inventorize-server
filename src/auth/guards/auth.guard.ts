import { Injectable } from '@nestjs/common';
import { AuthGuard as NestGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends NestGuard('jwt') {}
