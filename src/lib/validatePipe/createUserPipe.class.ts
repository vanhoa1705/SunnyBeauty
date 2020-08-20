import { RegisterUser } from './../../users/users.dto';
import { CreateBrand } from './../../brands/brands.dto';
import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class CreateUserPipe implements PipeTransform<any> {
  async transform(value: RegisterUser) {
    //kiểm tra thiếu dữ liệu
    if (!value.username) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'USERNAME_REQUIRED',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!value.phoneNumber) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'PHONE_NUMBER_REQUIRED',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!value.password) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'PASSWORD_REQUIRED',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!value.name) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'NAME_REQUIRED',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!value.email) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'EMAIL_REQUIRED',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!value.address) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'ADDRESS_REQUIRED',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    //Kiểm tra tính hợp lệ của phone number
    let s1 = new RegExp('^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$');

    if (s1.test(value.phoneNumber) === false) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'PHONE_NUMBER_INVALID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    //Kiểm tra tính hợp lệ của email
    let s2 = new RegExp(
      `^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$`,
    );

    if (s2.test(value.email) === false) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'EMAIL_INVALID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    //Kiểm tra password bé hơn 6 ký tự
    if (value.password.length < 6) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'PASSWORD_SHORT',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
