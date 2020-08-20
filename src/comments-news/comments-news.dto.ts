import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentNews {
  @ApiProperty({ type: String, description: 'Parent Id', required: false })
  parentId: string;

  @ApiProperty({ type: String, description: 'Content' })
  content: string;
}

export class UpdateCommentNews {
  @ApiProperty({ type: String, description: 'Content' })
  content: string;
}
