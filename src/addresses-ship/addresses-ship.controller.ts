import { UpdateAddressPipe } from './../lib/validatePipe/updateAddressPipe.class';
import { CreateAddressPipe } from './../lib/validatePipe/createAddressPipe.class';
import { CreateAddress } from './addresses-ship.dto';
import { AddressesShipService } from './addresses-ship.service';
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
import { ApiCreatedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { CheckUUID } from 'src/lib/validatePipe/uuidPipe.class';

@ApiTags('Addresses Ship')
@Controller('addresses-ship')
export class AddressesShipController {
  constructor(
    @Inject(AddressesShipService)
    private readonly addressesShipService: AddressesShipService,
  ) {}

  @Get('/detail/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Get single address ship' })
  async getSingleAddress(
    @GetUser('userId') userId: string,
    @Param('id', new CheckUUID()) id: string,
  ) {
    return await this.addressesShipService.getSingle(userId, id);
  }

  @Get('user')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Get single address ship' })
  async getAddressByUserId(@GetUser('userId') userId: string) {
    return await this.addressesShipService.getByUserId(userId);
  }

  @Post('add')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Create Address Ship' })
  async postAddress(
    @GetUser('userId') userId: string,
    @Body(new CreateAddressPipe()) address: CreateAddress,
  ) {
    return await this.addressesShipService.insertAddress(userId, address);
  }

  @Put('update/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Update Address Ship' })
  async updateAddress(
    @GetUser('userId') userId: string,
    @Param('id', new CheckUUID()) id: string,
    @Body(new UpdateAddressPipe()) address: CreateAddress,
  ) {
    return await this.addressesShipService.update(userId, id, address);
  }

  @Delete('delete/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Update Address Ship' })
  async deleteAddress(
    @GetUser('userId') userId: string,
    @Param('id', new CheckUUID()) id: string,
  ) {
    return await this.addressesShipService.delete(userId, id);
  }
}
