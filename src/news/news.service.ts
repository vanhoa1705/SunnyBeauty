import { CreateNews } from './news.dto';
import { News } from './../entity/news.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async getAll() {
    const news = await this.newsRepository.find();
    return { news: news };
  }

  async getByID(id: string) {
    const news = await this.newsRepository.find({
      where: {
        id: id,
      },
    });
    if (!news) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'NEWS_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return { news: news };
  }

  async insertNews(news: CreateNews) {
    await this.newsRepository.save(news);
    return { isSuccess: true };
  }

  async update(id: string, news: CreateNews) {
    const checkNews = await this.newsRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!checkNews) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'NEWS_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    if (news.title) {
      checkNews.title = news.title;
    }
    if (news.content) {
      checkNews.content = news.content;
    }
    await this.newsRepository.save(checkNews);
    return { isSuccess: true };
  }

  async delete(id: string) {
    const checkNews = await this.newsRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!checkNews) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'NEWS_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    checkNews.deletedAt = new Date();
    await this.newsRepository.save(checkNews);
    return { isSuccess: true };
  }
}
