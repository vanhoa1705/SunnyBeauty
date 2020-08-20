import { UpdateOrderPipe } from './../lib/validatePipe/updateOrderPipe.class';
import { CreateOrderPipe } from './../lib/validatePipe/createOrderPipe.class';
import { CreateOrder, UpdateOrder } from './orders.dto';
import { OrdersService } from './orders.service';
import {
  Controller,
  Inject,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { CheckUUID } from 'src/lib/validatePipe/uuidPipe.class';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/role.decorators';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(OrdersService)
    private readonly orderService: OrdersService,
  ) {}

  @Get('/detail/:orderId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Get Order' })
  async getSingleOrder(
    @GetUser('userId') userId: string,
    @Param('orderId', new CheckUUID()) id: string,
  ) {
    return await this.orderService.getSingle(userId, id);
  }

  @Get('/user')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Get Order by user' })
  async getOrderByUser(@GetUser('userId') userId: string) {
    return await this.orderService.getByUser(userId);
  }

  @Post('add')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Create order' })
  async postOrder(
    @GetUser('userId') userId: string,
    @Body(new CreateOrderPipe()) order: CreateOrder,
  ) {
    return await this.orderService.insertOrder(userId, order);
  }

  @Put('cancel/:orderId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Cancel order' })
  async cancelOrder(
    @GetUser('userId') userId: string,
    @Param('orderId', new CheckUUID()) id: string,
  ) {
    return await this.orderService.cancel(userId, id);
  }

  @Put('update/:orderId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({
    summary: 'Status: 0: Đang chuẩn bị, 1: Đang giao, 2: Đã giao, -1: Đã huỷ',
  })
  @ApiCreatedResponse({ description: 'Update order' })
  async updateOrder(
    @Param('orderId', new CheckUUID()) id: string,
    @Body(new UpdateOrderPipe()) order: UpdateOrder,
  ) {
    return await this.orderService.update(id, order);
  }

  @Delete('delete/:orderId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCreatedResponse({ description: 'Delete order' })
  async deleteOrder(
    @GetUser('userId') userId: string,
    @Param('orderId', new CheckUUID()) id: string,
  ) {
    return await this.orderService.delete(userId, id);
  }
}
