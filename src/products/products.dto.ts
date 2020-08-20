import { ApiProperty } from '@nestjs/swagger';

export class CreateProduct {
  @ApiProperty({ type: String, description: 'Name' })
  name: string;

  @ApiProperty({ type: Number, description: 'Price' })
  price: number;

  @ApiProperty({ type: Boolean, description: 'Status' })
  status: boolean;

  @ApiProperty({ type: String, description: 'Description' })
  description: string;

  @ApiProperty({ type: String, description: 'Category Id' })
  categoryId: string;

  @ApiProperty({ type: String, description: 'Brand Id' })
  brandId: string;
}

export class ProductFilter {
  @ApiProperty()
  readonly brandId?: string;

  @ApiProperty()
  readonly sortType?: string;

  @ApiProperty()
  readonly maxPrice?: number;

  @ApiProperty()
  readonly minPrice?: number;
}
