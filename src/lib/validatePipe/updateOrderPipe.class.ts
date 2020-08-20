import { UpdateOrder } from './../../orders/orders.dto';
import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class UpdateOrderPipe implements PipeTransform<any> {
  async transform(value: UpdateOrder) {
    if (value.status < -1 || value.status > 2) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'STATUS_INVALID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }
}
