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
  Query,
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
import { UserImagePipe } from 'src/user-image/user-image.pipe';
import { UserQueryDto } from './dto/userQuery.dto';

const storage = {
  // storage: multer.diskStorage({
  //   destination: './uploads/profileImages',
  //   filename: (req, file, cb) => {
  //     const origin = path.parse(file.originalname);
  //     const filename: string = v4();
  //     const extension: string = origin.ext;
  //     cb(null, `${filename}${extension}`);
  //   },
  // }),
  storage: multer.memoryStorage(),
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

  @Get()
  async getMany(@Query() query: UserQueryDto) {
    return await this.userService.getMany({
      id: query.id,
      email: query.email,
      nickname: query.nickname,
    });
  }

  // @UseGuards(JwtGuard)
  // @Get('me')
  // async getMe(@Req() req: Request) {
  //   return await this.userService.getUserById(req.user.id);
  // }

  @Get(':id')
  async getOneUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  // Soft Delete가 더 좋아보임
  // @Post('deleteMany')
  // async deleteMany(@Body() data) {
  //   console.log(data);
  //   return await this.userService.deleteMany(data);
  // }

  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image', storage))
  @Post(':id')
  async uploadFile(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(UserImagePipe)
    file: string,
    // file: Express.Multer.File,
    @Body() data: Prisma.UserUpdateInput,
  ) {
    if (req.user.id !== id)
      throw new HttpException('unauthorized', HttpStatus.BAD_REQUEST);
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }

    return await this.userService
      .updateUser(req.user.id, data, file ? file : undefined)
      .catch(() => {
        fs.unlinkSync(`./uploads/profileImages/${file}`);
      });
  }

  @Get('profileImage/:imageName')
  getProfileImage(@Param('imageName') imageName): StreamableFile {
    const file = fs.createReadStream(
      path.join('./uploads/profileImages/' + imageName),
    );

    return new StreamableFile(file);
  }
}
