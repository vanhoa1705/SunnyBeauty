import { CreateBrandPipe } from './../lib/validatePipe/createBrandPipe.class';
import { CreateBrand } from './brands.dto';
import { BrandsService } from './brands.service';
import {
  Controller,
  Inject,
  Get,
  Body,
  Post,
  Patch,
  Delete,
  UseGuards,
  Put,
  Param,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/role.decorators';
import { CheckUUID } from 'src/lib/validatePipe/uuidPipe.class';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(
    @Inject(BrandsService)
    private readonly brandsService: BrandsService,
  ) {}

  @Get()
  @ApiCreatedResponse({ description: 'Get all brands' })
  async getBrand() {
    return await this.brandsService.getAll();
  }

  @Get(':brandId')
  @ApiCreatedResponse({ description: 'Get all brands' })
  async getById(@Param('brandId', new CheckUUID()) id: string) {
    return await this.brandsService.getById(id);
  }

  @Get(':brandId/product')
  @ApiCreatedResponse({ description: 'Get product by brands' })
  async getProductByBrand(@Param('brandId', new CheckUUID()) id: string) {
    return await this.brandsService.getProduct(id);
  }

  @Post('add')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCreatedResponse({ description: 'Insert brand' })
  async postBrand(@Body(new CreateBrandPipe()) brand: CreateBrand) {
    return await this.brandsService.insertBrand(brand);
  }

  @Put('update/:brandId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCreatedResponse({ description: 'Update brand' })
  async updateBrand(
    @Param('brandId', new CheckUUID()) id: string,
    @Body(new CreateBrandPipe()) brand: CreateBrand,
  ) {
    return await this.brandsService.update(id, brand);
  }

  @Delete('delete/:brandId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCreatedResponse({ description: 'Update brand' })
  async deleteBrand(@Param('brandId', new CheckUUID()) id: string) {
    return await this.brandsService.delete(id);
  }
}
