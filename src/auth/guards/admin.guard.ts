import {
  Injectable,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<any> {
    await super.canActivate(context);
    const request = context.switchToHttp().getRequest();
    return request.user.role === 'admin';
  }
}
