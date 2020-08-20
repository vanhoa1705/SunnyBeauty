import { Product } from './../entity/product.entity';
import { Category } from './../entity/category.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategory } from './categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAll() {
    const category = await this.categoryRepository.find();
    return { category: category };
  }

  async GetByID(id) {
    const category = await this.categoryRepository.find({
      where: {
        id: id,
      },
    });
    return { category: category };
  }

  async subCategory(id) {
    const category = await this.categoryRepository.find({
      where: {
        parentId: id,
      },
    });
    return { category: category };
  }

  async getProductByCategory(id) {
    const product = await this.productRepository.find({
      where: {
        categoryId: id,
      },
    });
    return { product: product };
  }

  async insertCategory(category: CreateCategory) {
    if (category.parentId) {
      const checkParentId = await this.categoryRepository.findOne({
        where: {
          id: category.parentId,
        },
      });
      if (!checkParentId) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'PARENTID_NOT_EXIST',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const checkCategory = await this.categoryRepository.findOne({
      where: {
        name: category.name,
      },
    });
    if (checkCategory) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'CATEGORY_ALREADY_EXIST',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.categoryRepository.save(category);
    return { isSuccess: true };
  }

  async update(id: string, category: CreateCategory) {
    const checkCategory = await this.categoryRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!checkCategory) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'CATEGORY_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    //kiểm tra parentId
    if (category.parentId) {
      const checkParentId = await this.categoryRepository.findOne({
        where: {
          id: category.parentId,
        },
      });
      if (!checkParentId) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'PARENTID_NOT_EXIST',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      checkCategory.parentId = category.parentId;
    }

    if (category.name) {
      checkCategory.name = category.name;
    }

    await this.categoryRepository.save(checkCategory);
    return { isSuccess: true };
  }

  async delete(id: string) {
    const checkCategory = await this.categoryRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!checkCategory) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'CATEGORY_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    checkCategory.deletedAt = new Date();

    await this.categoryRepository.save(checkCategory);
    return { isSuccess: true };
  }
}
