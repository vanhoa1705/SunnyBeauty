import { Brand } from './../entity/brand.entity';
import { CreateProduct, ProductFilter } from './products.dto';
import { Category } from './../entity/category.entity';
import { Product } from './../entity/product.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  Like,
  Raw,
  Any,
  LessThan,
  LessThanOrEqual,
  MoreThan,
} from 'typeorm';
import { change_alias } from 'src/lib/utils';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  //get all product
  async getAll(page: number, limit: number) {
    page = parseInt(page.toString());
    limit = parseInt(limit.toString());

    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 4;
    }

    if (page <= 0) page = 1;
    if (limit <= 0) limit = 4;

    const totalRecords = await this.productRepository.count();
    const totalPages = Math.ceil(totalRecords / limit);
    if (page > totalPages) page = totalPages;

    const offset = (page - 1) * limit;

    // const data = await this.productRepository.find({
    //   take: limit,
    //   skip: offset,
    // });
    const data = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndMapMany(
        'product.categoryId',
        Category,
        'category',
        'category.id  = product.categoryId',
      )
      .leftJoinAndMapMany(
        'product.brandId',
        Brand,
        'brand',
        'brand.id  = product.brandId',
      )
      .take(limit)
      .skip(offset)
      .getMany();
    return {
      page: page,
      totalPages: totalPages,
      limit: limit,
      totalRecords: totalRecords,
      data: data,
    };
  }

  //get product
  async getProduct(id) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .where(`product.id = '${id}'`)
      .leftJoinAndMapMany(
        'product.categoryId',
        Category,
        'category',
        'category.id  = product.categoryId',
      )
      .leftJoinAndMapMany(
        'product.brandId',
        Brand,
        'brand',
        'brand.id  = product.brandId',
      )
      .getMany();

    // .findOne({
    //   where: {
    //     id: id,
    //   },
    // });
    //Kiểm tra Sản phầm tồn tại
    if (!product) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'PRODUCT_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return { product: product };
  }

  //tìm kiếm sản phẩm
  async search(key, sortType, page, limit) {
    page = parseInt(page.toString());
    limit = parseInt(limit.toString());

    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 4;
    }

    if (page <= 0) page = 1;
    if (limit <= 0) limit = 4;

    const data = this.productRepository
      .createQueryBuilder('product')
      .where(`unaccent("product"."name") ilike '%${change_alias(key)}%'`);

    const totalRecords = await data.getCount();

    if (totalRecords == 0) {
      return {
        page: 0,
        totalPages: 0,
        limit: 0,
        totalRecords: 0,
        data: [],
      };
    }

    const totalPages = Math.ceil(totalRecords / limit);
    if (page > totalPages) page = totalPages;

    const offset = (page - 1) * limit;

    data
      .leftJoinAndMapMany(
        'product.categoryId',
        Category,
        'category',
        'category.id  = product.categoryId',
      )
      .leftJoinAndMapMany(
        'product.brandId',
        Brand,
        'brand',
        'brand.id  = product.brandId',
      )
      .take(limit)
      .skip(offset);
    if (sortType) {
      data.orderBy({ 'product.price': sortType });
    }

    const product = await data.getMany();

    return {
      page: page,
      totalPages: totalPages,
      limit: limit,
      totalRecords: totalRecords,
      data: product,
    };
  }

  //filter
  async filter(categoryId, brandId, sortType, maxPrice, minPrice, page, limit) {
    page = parseInt(page.toString());
    limit = parseInt(limit.toString());

    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 4;
    }

    if (page <= 0) page = 1;
    if (limit <= 0) limit = 4;

    const data = this.productRepository.createQueryBuilder('product');

    if (categoryId) {
      for (let i = 0; i < categoryId.length; i++) {
        if (i == 0) {
          data.andWhere(`product.categoryId = '${categoryId[i]}'`);
        } else {
          data.orWhere(`product.categoryId = '${categoryId[i]}'`);
        }
      }
    }

    if (brandId) {
      for (let i = 0; i < brandId.length; i++) {
        if (i == 0) {
          data.andWhere(`product.brandId = '${brandId[i]}'`);
        } else {
          data.orWhere(`product.brandId = '${brandId[i]}'`);
        }
      }
    }

    if (maxPrice) {
      data.andWhere(`product.price <= ${maxPrice}`);
    }
    if (minPrice) {
      data.andWhere(`product.price >= ${minPrice}`);
    }

    const totalRecord = await data.getCount();

    if (totalRecord == 0) {
      return {
        page: 0,
        totalPages: 0,
        limit: 0,
        totalRecords: 0,
        data: [],
      };
    }

    const totalPages = Math.ceil(totalRecord / limit);
    if (page > totalPages) page = totalPages;

    const offset = (page - 1) * limit;

    data.take(limit);
    data.skip(offset);

    if (sortType) {
      data.orderBy({ 'product.price': sortType });
    }

    const product = await data.getMany();

    return {
      page: page,
      totalPages: totalPages,
      limit: limit,
      totalRecords: totalRecord,
      product: product,
    };
  }

  //Insert Product
  async insertProduct(product: CreateProduct) {
    const checkCategory = await this.categoryRepository.findOne({
      where: {
        id: product.categoryId,
      },
    });
    //Kiểm tra Danh mục tồn tại
    if (!checkCategory) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'PARENTID_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    //Kiểm tra danh mục cha
    if (!checkCategory.parentId) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'PARENTID_INVALID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.productRepository.save(product);
    return { isSuccess: true };
  }

  //Update Product
  async update(id: string, product: CreateProduct) {
    const checkProduct = await this.productRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!checkProduct) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'PRODUCT_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (product.name) {
      checkProduct.name = product.name;
    }
    if (product.price) {
      checkProduct.price = product.price;
    }
    if (product.status) {
      checkProduct.status = product.status;
    }
    if (product.description) {
      checkProduct.description = product.description;
    }
    if (product.brandId) {
      checkProduct.brandId = product.brandId;
    }
    if (product.categoryId) {
      checkProduct.categoryId = product.categoryId;
    }
    await this.productRepository.save(checkProduct);
    return { isSuccess: true };
  }

  //Delete product
  async delete(id: string) {
    const checkProduct = await this.productRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!checkProduct) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'PRODUCT_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    checkProduct.deletedAt = new Date();

    await this.productRepository.save(checkProduct);
    return { isSuccess: true };
  }
}
