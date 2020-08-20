import { CreateBrand } from './../../brands/brands.dto';
import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class CreateBrandPipe implements PipeTransform<any> {
  async transform(value: CreateBrand) {
    if (!value.name) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'NAME_REQUIRED',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
