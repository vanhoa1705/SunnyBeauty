import { CreateOrder } from './../../orders/orders.dto';
import { CreateNews } from './../../news/news.dto';
import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class CreateOrderPipe implements PipeTransform<any> {
  async transform(value: CreateOrder) {
    //Kiểm tra hợp lệ của address ID
    let s = new RegExp(
      '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
    );

    //Kiểm tra hợp lệ của address ID
    if (s.test(value.addressId) === false) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'ADDRESSID_INVALID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    //kiểm tra hợp lệ total quantity
    if (Number.isInteger(value.totalQuantity) || value.totalQuantity < 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'TOTAL_QUANTITY_INVALID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    //kiểm tra hợp lệ total amount
    if (Number.isInteger(value.totalAmount) || value.totalAmount < 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'TOTAL_AMOUNT_INVALID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    //kiểm tra order detail
    if (!value.orderDetail || value.orderDetail.length == 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'ORDER_DETAIL_REQUIRED',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    for (let i = 0; i < value.orderDetail.length; i++) {
      //kiểm tra hợp lệ price
      if (
        Number.isInteger(value.orderDetail[i].price) ||
        value.orderDetail[i].price < 0
      ) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'PRICE_INVALID',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      //kiểm tra hợp lệ quantity
      if (
        Number.isInteger(value.orderDetail[i].quantity) ||
        value.orderDetail[i].quantity < 0
      ) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'QUANTITY_INVALID',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      //kiểm tra hợp lệ amount
      if (
        Number.isInteger(value.orderDetail[i].amount) ||
        value.orderDetail[i].amount < 0
      ) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'AMOUNT_INVALID',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      //kiểm tra tính hợp lệ của productID
      if (s.test(value.orderDetail[i].productId) === false) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'PRODUCTID_INVALID',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return value;
  }
}
