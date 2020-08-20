import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentProduct {
  @ApiProperty({ type: String, description: 'Parent Id', required: false })
  parentId: string;

  @ApiProperty({ type: String, description: 'Content' })
  content: string;
}

export class UpdateCommentProduct {
  @ApiProperty({ type: String, description: 'Content' })
  content: string;
}
