import { Product } from './../entity/product.entity';
import { TestingModule } from '@nestjs/testing';
import { Brand } from './../entity/brand.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrand } from './brands.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAll() {
    const brand = await this.brandRepository.find();
    return { brand: brand };
  }

  async getById(id) {
    const brand = await this.brandRepository.findOne({
      where: {
        id: id,
      },
    });
    return { brand: brand };
  }

  async getProduct(id) {
    const product = await this.productRepository.find({
      where: {
        brandId: id,
      },
    });
    return { product: product };
  }

  async insertBrand(brand: CreateBrand) {
    //kiểm tra tồn tại
    const check = await this.brandRepository.findOne({
      where: {
        name: brand.name,
      },
    });

    if (check) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'BRAND_AVAILABLE',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.brandRepository.save(brand);
    return { isSuccess: true };
  }

  async update(id: string, brand: CreateBrand) {
    //kiểm tra tồn tại brand ID
    const checkBrand = await this.brandRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!checkBrand) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'BRAND_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    checkBrand.name = brand.name;
    await this.brandRepository.save(checkBrand);
    return { isSuccess: true };
  }

  async delete(id: string) {
    const checkBrand = await this.brandRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!checkBrand) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'BRAND_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    checkBrand.deletedAt = new Date();

    await this.brandRepository.save(checkBrand);
    return { isSuccess: true };
  }
}
