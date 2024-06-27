import {
  BadRequestException,
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
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserService } from './user.service';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
import { Prisma } from '@prisma/client';
import { v4 } from 'uuid';
import * as fs from 'fs';

const storage = {
  storage: multer.diskStorage({
    destination: './uploads/profileImages',
    filename: (req, file, cb) => {
      const origin = path.parse(file.originalname);
      const filename: string = origin.name.replace(/\s/g, '') + v4();
      const extension: string = origin.ext;
      cb(null, `${filename}${extension}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/image\/(png|jpeg|gif)/)) {
      cb(null, true);
    } else {
      req.fileValidationError = `unsupported mime type: ${file.mimetype}`;
      cb(null, false);
    }
  },
};

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@Req() req: Request) {
    return await this.userService.getUserById(req.user.id);
  }

  @Get(':id')
  async getOneUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image', storage))
  @Post(':id')
  async uploadFile(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile()
    file: Express.Multer.File,
    @Body() data: Prisma.UserUpdateInput,
  ) {
    if (req.user.id !== id)
      throw new HttpException('unauthorized', HttpStatus.BAD_REQUEST);
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }

    return await this.userService
      .updateUser(req.user.id, data, file ? file.filename : undefined)
      .catch(() => {
        fs.unlinkSync(`./uploads/profileImages/${file.filename}`);
      });
  }

  @Get('profileImage/:imagename')
  getProfileImage(@Param('imagename') imagename): StreamableFile {
    const file = fs.createReadStream(
      path.join('./uploads/profileImages/' + imagename),
    );

    return new StreamableFile(file);
  }
}
