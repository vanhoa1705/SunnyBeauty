import { ChangePasswordUser } from './../../users/users.dto';
import { CreateAddress } from './../../addresses-ship/addresses-ship.dto';
import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class ChangePasswordPipe implements PipeTransform<any> {
  async transform(value: ChangePasswordUser) {
    //Kiểm tra password
    if (!value.password) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'PASSWORD_REQUIRED',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    //Kiểm tra password bé hơn 6 ký tự
    if (value.newPassword.length < 6) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'PASSWORD_SHORT',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    //Kiểm tra khớp mật khẩu
    if (value.newPassword != value.rePassword) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'PASSWORD_INCORRECT',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }
}
