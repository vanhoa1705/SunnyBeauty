import { UpdateCategoryPipe } from './../lib/validatePipe/updateCategoryPipe.class';
import { CreateCategoryPipe } from './../lib/validatePipe/createCategoryPipe.class';
import { Category } from './../entity/category.entity';
import { CategoriesService } from './categories.service';
import {
  Controller,
  Inject,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateCategory } from './categories.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/role.decorators';
import { CheckUUID } from 'src/lib/validatePipe/uuidPipe.class';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    @Inject(CategoriesService)
    private readonly categoriesService: CategoriesService,
  ) {}

  @Get()
  @ApiCreatedResponse({ description: 'Get all Categories' })
  async GetAllCategory() {
    return this.categoriesService.getAll();
  }

  @Get(':categoryId')
  @ApiCreatedResponse({ description: 'Get SubCategories' })
  async GetById(@Param('categoryId', new CheckUUID()) id: string) {
    return this.categoriesService.GetByID(id);
  }

  @Get(':categoryId/subcategory')
  @ApiCreatedResponse({ description: 'Get SubCategories' })
  async GetSubCategory(@Param('categoryId', new CheckUUID()) id: string) {
    return this.categoriesService.subCategory(id);
  }

  @Get(':categoryId/products')
  @ApiCreatedResponse({ description: 'Get SubCategories' })
  async GetProduct(@Param('categoryId', new CheckUUID()) id: string) {
    return this.categoriesService.getProductByCategory(id);
  }

  @Post('add')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCreatedResponse({ description: 'Add category' })
  async AddCategory(@Body(new CreateCategoryPipe()) category: CreateCategory) {
    return this.categoriesService.insertCategory(category);
  }

  @Put('update/:categoryId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCreatedResponse({ description: 'Update Category' })
  async updateCategory(
    @Param('categoryId', new CheckUUID()) id: string,
    @Body(new UpdateCategoryPipe()) category: CreateCategory,
  ) {
    return await this.categoriesService.update(id, category);
  }

  @Delete('delete/:categoryId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCreatedResponse({ description: 'Delete Category' })
  async deleteCategory(@Param('categoryId', new CheckUUID()) id: string) {
    return await this.categoriesService.delete(id);
  }
}
