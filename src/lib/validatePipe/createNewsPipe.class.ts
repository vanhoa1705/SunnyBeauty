import { CreateNews } from './../../news/news.dto';
import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class CreateNewsPipe implements PipeTransform<any> {
  async transform(value: CreateNews) {
    if (!value.title) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'TITLE_REQUIRED',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!value.content) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'CONTENT_REQUIRED',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }
}
