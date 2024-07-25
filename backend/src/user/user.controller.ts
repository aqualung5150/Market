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
import multer from 'multer';
import path from 'path';
import { Prisma } from '@prisma/client';
import { v4 } from 'uuid';
import fs from 'fs';
import { UserImagePipe } from 'src/user-image/user-image.pipe';
import { UserQueryDto } from './dto/userQuery.dto';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

const storage = {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
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

  // GET
  @Get()
  async getMany(@Query() query: UserQueryDto) {
    return await this.userService.getMany({
      id: query.id,
      email: query.email,
      nickname: query.nickname,
    });
  }

  @Get(':id')
  async getOneUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @Get('profileImage/:imageName')
  getProfileImage(@Param('imageName') imageName: string): StreamableFile {
    const file = fs.createReadStream(
      path.join('uploads/profileImages/' + imageName),
    );

    return new StreamableFile(file);
  }

  // POST
  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Post('deleteMany')
  async deleteUsers(@Body() data: { users: number[] }) {
    return await this.userService.deleteUsers(data);
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image', storage))
  @Post(':id')
  async uploadFile(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(UserImagePipe)
    filename: string,
    @Body() data: Prisma.UserUpdateInput,
  ) {
    if (req.user.id !== id)
      throw new HttpException('unauthorized', HttpStatus.BAD_REQUEST);
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }

    return await this.userService
      .updateUser(req.user.id, data, filename ? filename : undefined)
      .catch(() => {
        fs.unlinkSync(`uploads/profileImages/${filename}`);
      });
  }
}
