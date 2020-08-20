import { Product } from './../entity/product.entity';
import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'src/entity/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Product])],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
