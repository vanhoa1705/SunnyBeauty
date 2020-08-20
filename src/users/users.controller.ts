import { ChangePasswordPipe } from './../lib/validatePipe/changePasswordPipe.class';
import { CreateUserPipe } from './../lib/validatePipe/createUserPipe.class';
import { Roles } from './../role/role.decorators';
import { UsersService } from './users.service';
import {
  Controller,
  Post,
  Body,
  Inject,
  UploadedFile,
  UseInterceptors,
  Get,
  Res,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiBody,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  RegisterUser,
  LoginUser,
  ChangePasswordUser,
  UpdateUser,
  DeleteUser,
} from './users.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { RolesGuard } from 'src/role/roles.guard';
import { CheckUUID } from 'src/lib/validatePipe/uuidPipe.class';
import { UpdateUserPipe } from 'src/lib/validatePipe/updateUserPipe.class';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  @ApiCreatedResponse({ description: 'User Register' })
  async insertUser(@Body(new CreateUserPipe()) user: RegisterUser) {
    return await this.usersService.addUser(user);
  }

  @Post('login')
  @ApiCreatedResponse({ description: 'User Login' })
  async loginUser(@Body() user: LoginUser) {
    return await this.usersService.loginUser(user);
  }

  @Get(':userId')
  @ApiCreatedResponse({ description: 'Get information' })
  async getUser(@Param('userId', new CheckUUID()) user: string) {
    return await this.usersService.getSingleUser(user);
  }

  @Post('changepassword')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Change password' })
  async changPasswordUser(
    @GetUser('userId') userId: string,
    @Body(new ChangePasswordPipe()) user: ChangePasswordUser,
  ) {
    return await this.usersService.changePassword(userId, user);
  }

  @Post('upload')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Upload Avatar' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile('file') file,
    @GetUser('userId') userId: string,
  ) {
    return await this.usersService.uploadAvatar(file, userId);
  }

  // @Get('download/:fileName')
  // @ApiCreatedResponse({ description: 'Download' })
  // async downloadFile(@Res() res, @Param('fileName') fileName: string) {
  //   return await this.usersService.downloadAvatar(res, fileName);
  // }

  @Put('update')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Update User' })
  async updateUser(
    @GetUser('userId') userId: string,
    @Body(new UpdateUserPipe()) user: UpdateUser,
  ) {
    return await this.usersService.update(userId, user);
  }

  @Delete('delete/:userId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCreatedResponse({ description: 'Delete User' })
  async deleteUser(@Param('userId', new CheckUUID()) userId: string) {
    return await this.usersService.delete(userId);
  }
}
