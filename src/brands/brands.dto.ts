import { ApiProperty } from '@nestjs/swagger';
export class CreateBrand {
  @ApiProperty({ type: String, description: 'Name' })
  name: string;
}
