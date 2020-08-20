import { AddressShip } from './../entity/addresses-ship.entity';
import { Product } from './../entity/product.entity';
import { OrderDetail } from './../entity/order-detail.entity';
import { User } from 'src/entity/user.entity';
import { Order } from './../entity/orders.entity';
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User, OrderDetail, Product, AddressShip]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
