import {
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@Req() req: Request) {
    const data = await this.userService.getUserById(req.user.id);
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      nickname: data.nickname,
    };
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }
}
