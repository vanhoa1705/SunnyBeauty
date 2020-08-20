import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log('JwtAuthGuard -> handleRequest -> user', user);
    // You can throw an exception based on either "info" or "err" arguments
    if (err) {
      console.log('JwtAuthGuard -> handleRequest -> err', err);
      throw err;
    }
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'UNAUTHORIZED',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
