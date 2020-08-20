import { CreateCommentNews } from '../../comments-news/comments-news.dto';
import {
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class UpdateCommentPipe implements PipeTransform<any> {
  async transform(value: CreateCommentNews) {
    //kiểm tra thiếu dữ liệu
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
