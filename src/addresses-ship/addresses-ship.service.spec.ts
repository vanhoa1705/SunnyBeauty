import { Test, TestingModule } from '@nestjs/testing';
import { AddressesShipService } from './addresses-ship.service';

describe('AddressesShipService', () => {
  let service: AddressesShipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressesShipService],
    }).compile();

    service = module.get<AddressesShipService>(AddressesShipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
