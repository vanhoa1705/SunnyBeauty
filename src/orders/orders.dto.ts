import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/entity/orders.entity';
import { OrderDetail } from 'src/entity/order-detail.entity';

export class CreateOrderDetail {
  @ApiProperty({ type: String, description: 'Product Id' })
  productId: string;

  @ApiProperty({ type: Number, description: 'Price' })
  price: number;

  @ApiProperty({ type: Number, description: 'Quantity' })
  quantity: number;

  @ApiProperty({ type: Number, description: 'Amount' })
  amount: number;
}

export class CreateOrder {
  @ApiProperty({ type: String, description: 'Address Id' })
  addressId: string;

  @ApiProperty({ type: Number, description: 'Total Quantity' })
  totalQuantity: number;

  @ApiProperty({ type: Number, description: 'Total Amount' })
  totalAmount: number;

  @ApiProperty({ type: [CreateOrderDetail] })
  orderDetail: CreateOrderDetail[];
}

export class InfoOrder {
  @ApiProperty({ type: Order, description: 'Order' })
  order: Order;

  @ApiProperty({ type: OrderDetail, description: 'Order Detail' })
  orderDetail: OrderDetail[];
}

export class UpdateOrder {
  @ApiProperty({ type: Number, description: 'Status' })
  status: number;
}
