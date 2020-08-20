import { CreateCategory } from './../../categories/categories.dto';
import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class CreateCategoryPipe implements PipeTransform<any> {
  async transform(value: CreateCategory) {
    if (!value.name) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'NAME_REQUIRED',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (value.parentId) {
      let s = new RegExp(
        '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
      );

      if (s.test(value.parentId) === false) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'PARENTID_INVALID',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return value;
  }
}
