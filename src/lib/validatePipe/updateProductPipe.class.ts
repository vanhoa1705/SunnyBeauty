import { CreateProduct } from './../../products/products.dto';
import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class UpdateProductPipe implements PipeTransform<any> {
  async transform(value: CreateProduct) {
    //kiểm tra hợp lệ của UUID
    let s = new RegExp(
      '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
    );

    if (value.brandId) {
      if (s.test(value.brandId) === false) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'BRANDID_INVALID',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (value.categoryId) {
      if (s.test(value.categoryId) === false) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'CATEGORYID_INVALID',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    //Kiểm tra isNumber
    if (value.price) {
      if (typeof value.price != 'number') {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'PRICE_INVALID',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (value.price < 0) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'PRICE_MUST_BE_POSITIVE_NUMBER',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return value;
  }
}
