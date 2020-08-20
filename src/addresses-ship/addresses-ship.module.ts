import { User } from './../entity/user.entity';
import { AddressShip } from './../entity/addresses-ship.entity';
import { Module } from '@nestjs/common';
import { AddressesShipController } from './addresses-ship.controller';
import { AddressesShipService } from './addresses-ship.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AddressShip, User])],
  controllers: [AddressesShipController],
  providers: [AddressesShipService],
})
export class AddressesShipModule {}
