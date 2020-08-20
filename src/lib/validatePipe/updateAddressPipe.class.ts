import { CreateAddress } from './../../addresses-ship/addresses-ship.dto';
import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class UpdateAddressPipe implements PipeTransform<any> {
  async transform(value: CreateAddress) {
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
