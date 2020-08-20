import { User } from './../entity/user.entity';
import { CreateAddress } from './addresses-ship.dto';
import { AddressShip } from './../entity/addresses-ship.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AddressesShipService {
  constructor(
    @InjectRepository(AddressShip)
    private readonly addressShipRepository: Repository<AddressShip>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getSingle(userId: string, id: string) {
    const checkAddress = await this.addressShipRepository.findOne({
      where: {
        id: id,
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
    return { address: checkAddress };
  }

  async getByUserId(userId: string) {
    const checkAddress = await this.addressShipRepository.find({
      where: {
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
    return { address: checkAddress };
  }

  async insertAddress(userId: string, address: CreateAddress) {
    const checkUser = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!checkUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'USER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const saveAddress = new AddressShip();
    saveAddress.userId = userId;
    saveAddress.name = address.name;
    saveAddress.phoneNumber = address.phoneNumber;
    saveAddress.address = address.address;

    await this.addressShipRepository.save(saveAddress);
    return { isSuccess: true };
  }

  async update(userId: string, id: string, address: CreateAddress) {
    const checkAddress = await this.addressShipRepository.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!checkAddress) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'SHIPPING_ADDRESS_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (address.name) {
      checkAddress.name = address.name;
    }
    if (address.phoneNumber) {
      checkAddress.phoneNumber = address.phoneNumber;
    }
    if (address.address) {
      checkAddress.address = address.address;
    }

    await this.addressShipRepository.save(checkAddress);
    return { isSuccess: true };
  }

  async delete(userId: string, id: string) {
    const checkAddress = await this.addressShipRepository.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!checkAddress) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'ADDRESS_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    checkAddress.deletedAt = new Date();
    await this.addressShipRepository.save(checkAddress);
    return { isSuccess: true };
  }
}
