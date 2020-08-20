import { AddressShip } from './../entity/addresses-ship.entity';
import { Product } from './../entity/product.entity';
import { OrderDetail } from './../entity/order-detail.entity';
import { User } from 'src/entity/user.entity';
import { CreateOrder, UpdateOrder, InfoOrder } from './orders.dto';
import { Order } from './../entity/orders.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, Connection, getManager } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(AddressShip)
    private readonly addressShipRepository: Repository<AddressShip>,
  ) {}

  async getSingle(userId: string, id: string) {
    const order = await this.orderRepository.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!order) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'ORDER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndMapMany(
        'order.orderDetail',
        OrderDetail,
        'orderDetail',
        'orderDetail.orderId = order.id',
      )
      .where('order.userId = :userId', { userId: userId })
      .andWhere('order.id = :orderId', { orderId: id })
      .getOne();

    return { order: result };
  }

  async getByUser(userId: string) {
    const order = await this.orderRepository.find({
      where: {
        userId: userId,
      },
    });
    if (!order) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'ORDER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const listOrder = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndMapMany(
        'order.orderDetail',
        OrderDetail,
        'orderDetail',
        'orderDetail.orderId = order.id',
      )
      .where('order.userId = :userId', { userId: userId })
      .getMany();

    return { listOrder: listOrder };
  }

  async insertOrder(userId: string, order: CreateOrder) {
    //kiểm tra tồn tại addressShip
    const checkAddress = await this.addressShipRepository.findOne({
      where: {
        id: order.addressId,
        userId: userId,
      },
    });

    if (!checkAddress) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'ADDRESS_SHIP_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    let name = [];

    let totalAmount = 0;
    let totalQuantity = 0;

    for (let i = 0; i < order.orderDetail.length; i++) {
      const checkProduct = await this.productRepository.findOne({
        where: {
          id: order.orderDetail[i].productId,
        },
      });

      if (checkProduct.price != order.orderDetail[i].price) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'PRICE_INVALID',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      let amount = order.orderDetail[i].quantity * order.orderDetail[i].price;

      if (amount != order.orderDetail[i].amount) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'AMOUNT_INVALID',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      name[i] = checkProduct.name;

      totalAmount += order.orderDetail[i].quantity * order.orderDetail[i].price;
      totalQuantity = totalQuantity + order.orderDetail[i].quantity;
    }

    if (totalAmount != order.totalAmount) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'TOTAL_AMOUNT_INVALID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (totalQuantity != order.totalQuantity) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'TOTAL_QUANTITY_INVALID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    let newOrder = new Order();
    newOrder.userId = userId;
    newOrder.addressId = order.addressId;
    newOrder.totalQuantity = order.totalQuantity;
    newOrder.totalAmount = order.totalAmount;

    let arrOrderDetail = new Array();
    for (let i = 0; i < order.orderDetail.length; i++) {
      const newOrderDetail = new OrderDetail();
      newOrderDetail.productId = order.orderDetail[i].productId;
      newOrderDetail.name = name[i];
      newOrderDetail.unitPrice = order.orderDetail[i].price;
      newOrderDetail.quantity = order.orderDetail[i].quantity;
      newOrderDetail.amount = order.orderDetail[i].amount;

      arrOrderDetail.push(newOrderDetail);
    }

    await getManager().transaction(async transactionalEntityManager => {
      newOrder = await transactionalEntityManager.save<Order>(newOrder);
      for (let i = 0; i < arrOrderDetail.length; i++) {
        arrOrderDetail[i].orderId = newOrder.id;
      }

      await transactionalEntityManager.save<OrderDetail[]>(arrOrderDetail);
    });

    return { isSuccess: true };
  }

  async update(id: string, order: UpdateOrder) {
    //Kiểm tra tồn tại order
    const checkOrder = await this.orderRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!checkOrder) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'ORDER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (order.status) {
      checkOrder.status = order.status;
    }
    await this.orderRepository.save(checkOrder);
    return { isSuccess: true };
  }

  async cancel(userId: string, id: string) {
    //Kiểm tra tồn tại order
    const checkOrder = await this.orderRepository.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!checkOrder) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'ORDER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (checkOrder.status != 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'CANNOT_CANCEL',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    checkOrder.status = -1;

    await this.orderRepository.save(checkOrder);
    return { isSuccess: true };
  }

  async delete(userId: string, id: string) {
    const checkOrder = await this.orderRepository.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });

    //kiểm tra tồn tại orderID
    if (!checkOrder) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'ORDER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const temp = new Order();
    temp.deletedAt = new Date();
    await this.orderDetailRepository.update({ orderId: id }, temp);
    await this.orderRepository.update({ id: id }, temp);
    return { isSuccess: true };
  }
}
