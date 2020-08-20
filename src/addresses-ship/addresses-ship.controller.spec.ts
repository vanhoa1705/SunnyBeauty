import { Test, TestingModule } from '@nestjs/testing';
import { AddressesShipController } from './addresses-ship.controller';

describe('AddressesShip Controller', () => {
  let controller: AddressesShipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressesShipController],
    }).compile();

    controller = module.get<AddressesShipController>(AddressesShipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
