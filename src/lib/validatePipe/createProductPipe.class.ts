import { CreateProduct } from './../../products/products.dto';
import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class CreateProductPipe implements PipeTransform<any> {
  async transform(value: CreateProduct) {
    //kiểm tra thiếu dữ liệu
    if (!value.status) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'STATUS_REQUIRED',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!value.price) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'PRICE_REQUIRED',
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

    if (!value.name) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'NAME_REQUIRED',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!value.description) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'DESCRIPTION_REQUIRED',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    //kiểm tra hợp lệ của UUID
    let s = new RegExp(
      '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
    );

    if (s.test(value.brandId) === false) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'BRANDID_INVALID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (s.test(value.categoryId) === false) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'CATEGORYID_INVALID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (s.test(value.brandId) === false) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'BRANDID_INVALID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }
}
