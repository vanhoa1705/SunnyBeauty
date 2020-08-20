import { ApiProperty } from '@nestjs/swagger';
export class CreateAddress {
  @ApiProperty({ type: String, description: 'Name' })
  name: string;

  @ApiProperty({ type: String, description: 'Phone number' })
  phoneNumber: string;

  @ApiProperty({ type: String, description: 'Address' })
  address: string;
}
