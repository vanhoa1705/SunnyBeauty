import { UpdateUser } from '../../users/users.dto';
import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class UpdateUserPipe implements PipeTransform<any> {
  async transform(value: UpdateUser) {
    if (value.email) {
      //Kiểm tra tính hợp lệ của email
      let s = new RegExp(
        `^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$`,
      );
      if (s.test(value.email) === false) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'EMAIL_INVALID',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (value.phoneNumber) {
      //Kiểm tra tính hợp lệ của phone number
      let s1 = new RegExp(
        '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$',
      );

      if (s1.test(value.phoneNumber) === false) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'PHONE_NUMBER_INVALID',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return value;
  }
}
