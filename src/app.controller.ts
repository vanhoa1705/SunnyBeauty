import { User } from './entity/user.entity';
import { Controller, Get, Render, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { createConnection } from 'typeorm';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    this.appService = appService;
  }
}
