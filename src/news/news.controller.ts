import { CreateNewsPipe } from './../lib/validatePipe/createNewsPipe.class';
import { CreateNews } from './news.dto';
import { NewsService } from './news.service';
import {
  Controller,
  Inject,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/role.decorators';
import { CheckUUID } from 'src/lib/validatePipe/uuidPipe.class';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(
    @Inject(NewsService)
    private readonly newsService: NewsService,
  ) {}

  @Get()
  @ApiCreatedResponse({ description: 'Get all news' })
  async getNews() {
    return await this.newsService.getAll();
  }

  @Get(':newsId')
  @ApiCreatedResponse({ description: 'Get single news' })
  async getSingle(@Param('newsId', new CheckUUID()) id: string) {
    return await this.newsService.getByID(id);
  }

  @Post('add')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCreatedResponse({ description: 'Insert news' })
  async postNews(@Body(new CreateNewsPipe()) news: CreateNews) {
    return await this.newsService.insertNews(news);
  }

  @Put('update/:newsId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCreatedResponse({ description: 'Update news' })
  async updateNews(
    @Param('newsId', new CheckUUID()) id: string,
    @Body() news: CreateNews,
  ) {
    return await this.newsService.update(id, news);
  }

  @Delete('delete/:newsId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCreatedResponse({ description: 'Delete news' })
  async deleteNews(@Param('newsId', new CheckUUID()) id: string) {
    return await this.newsService.delete(id);
  }
}
