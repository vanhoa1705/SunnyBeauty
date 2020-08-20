import { ApiProperty } from '@nestjs/swagger';
export class CreateNews {
  @ApiProperty({ type: String, description: 'Title' })
  title: string;

  @ApiProperty({ type: String, description: 'Content' })
  content: string;
}
