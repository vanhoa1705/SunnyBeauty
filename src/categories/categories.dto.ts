import { ApiProperty } from '@nestjs/swagger';

export class CreateCategory {
  @ApiProperty({ type: String, description: 'Name' })
  name: string;

  @ApiProperty({ type: String, description: 'Parent ID', required: false })
  parentId: string;
}
