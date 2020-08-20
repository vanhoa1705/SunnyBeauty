import { UpdateProductPipe } from './../lib/validatePipe/updateProductPipe.class';
import { CreateProductPipe } from './../lib/validatePipe/createProductPipe.class';
import { CheckUUID } from './../lib/validatePipe/uuidPipe.class';
import { CreateProduct, ProductFilter } from './products.dto';
import { ProductsService } from './products.service';
import {
  Controller,
  Inject,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/role.decorators';
import { ConvertArray } from 'src/lib/validatePipe/convertArrayPipe.class';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    @Inject(ProductsService)
    private readonly productService: ProductsService,
  ) {}

  @Get()
  @ApiCreatedResponse({ description: 'Get all product' })
  async GetAllProduct(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.productService.getAll(page, limit);
  }

  @Get('detail/:productId')
  @ApiCreatedResponse({ description: 'Get all product' })
  async GetOneProduct(@Param('productId', new CheckUUID()) id: string) {
    return await this.productService.getProduct(id);
  }

  @Get('search')
  @ApiCreatedResponse({ description: 'Search' })
  @ApiQuery({ name: 'key' })
  @ApiQuery({ name: 'sortType', required: false, enum: ['ASC', 'DESC'] })
  async search(
    @Query('key') key: string,
    @Query('sortType') sortType: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.productService.search(key, sortType, page, limit);
  }

  @Get('filter')
  @ApiCreatedResponse({ description: 'Filter' })
  @ApiQuery({ name: 'brandId', required: false, type: String, isArray: true })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    type: String,
    isArray: true,
  })
  @ApiQuery({ name: 'sortType', required: false, enum: ['ASC', 'DESC'] })
  @ApiQuery({ name: 'maxPrice', required: false })
  @ApiQuery({ name: 'minPrice', required: false })
  async filter(
    @Query('brandId', new ConvertArray()) brandId: string[],
    @Query('categoryId', new ConvertArray()) categoryId: string[],
    @Query('sortType') sortType: string,
    @Query('maxPrice') maxPrice: number,
    @Query('minPrice') minPrice: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.productService.filter(
      categoryId,
      brandId,
      sortType,
      maxPrice,
      minPrice,
      page,
      limit,
    );
  }

  @Post('add')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCreatedResponse({ description: 'Add product' })
  async AddProduct(@Body(new CreateProductPipe()) product: CreateProduct) {
    return await this.productService.insertProduct(product);
  }

  @Put('update/:productId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCreatedResponse({ description: 'Update Product' })
  async updateProduct(
    @Param('productId', new CheckUUID()) id: string,
    @Body(new UpdateProductPipe()) product: CreateProduct,
  ) {
    return await this.productService.update(id, product);
  }

  @Delete('delete/:productId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCreatedResponse({ description: 'Delete Product' })
  async deleteProduct(@Param('productId', new CheckUUID()) id: string) {
    return await this.productService.delete(id);
  }
}
