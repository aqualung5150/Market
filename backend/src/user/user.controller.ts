import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserService } from './user.service';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Prisma } from '@prisma/client';
import { v4 } from 'uuid';
import { createReadStream } from 'fs';

export const profilImageStorage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename: string = v4();
      const extension: string = extname(file.originalname);
      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@Req() req: Request) {
    return await this.userService.getUserById(req.user.id);
    // return {
    //   id: data.id,
    //   name: data.name,
    //   email: data.email,
    //   nickname: data.nickname,
    // };
  }

  // @UseGuards(JwtGuard)
  @Get(':id')
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image', profilImageStorage))
  @Post(':id')
  async updateUser(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: Prisma.UserUpdateInput,
  ) {
    if (req.user.id !== id)
      throw new HttpException('unauthorized', HttpStatus.BAD_REQUEST);
    await this.userService.updateUserById(req.user.id, data, file);
  }

  @Get('profileImage/:imagename')
  getProfileImage(@Param('imagename') imagename, @Res() res) {
    const file = createReadStream(join('./uploads/profileimages/' + imagename));
    file.pipe(res);
  }
}
