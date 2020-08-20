import { CreateCommentNews } from '../../comments-news/comments-news.dto';
import {
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class CreateCommentPipe implements PipeTransform<any> {
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

    //Kiểm tra ParentID
    if (!value.parentId) {
      let s2 = new RegExp(
        '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
      );

      if (s2.test(value.parentId) === false) {
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
