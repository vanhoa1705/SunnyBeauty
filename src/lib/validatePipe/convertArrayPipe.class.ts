import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class ConvertArray implements PipeTransform<any> {
  async transform(value: string[]): Promise<string[]> {
    if (value) {
      let arrId: string[] = [];
      const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

      if (value && typeof value === 'string') {
        if (!uuidRegex.test(value)) {
          throw new HttpException(
            {
              statusCode: HttpStatus.BAD_REQUEST,
              message: 'ID_NOT_VALID',
            },
            HttpStatus.BAD_REQUEST,
          );
        }
        arrId.push(value);
      } else {
        if (!uuidRegex.test(value.toString())) {
          throw new HttpException(
            {
              statusCode: HttpStatus.BAD_REQUEST,
              message: 'ID_NOT_VALID',
            },
            HttpStatus.BAD_REQUEST,
          );
        }
        arrId = value;
      }
      return arrId;
    }
  }
}
