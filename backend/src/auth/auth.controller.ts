import {
  Controller,
  Get,
  Logger,
  Query,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserService } from 'src/user/user/user.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Get('google')
  async googleAuth(@Res() res: Response, @Query('code') code: string) {
    if (!code) throw new UnauthorizedException('No code in query string');

    const userData = await this.authService.getGoogleUser(code);

    const accessToken = await this.authService.jwtAccessToken({
      id: userData.id,
      name: userData.name,
      email: userData.email,
    });

    this.logger.debug(accessToken);

    const refreshToken = await this.authService.jwtRefreshToken({
      id: userData.id,
      name: userData.name,
      email: userData.email,
    });

    const hashedRefreshToken =
      await this.authService.hashJwtToken(refreshToken);

    const user = await this.userService.createUser({
      name: userData.name,
      email: userData.email,
    });

    this.userService.updateUserById(user.id, {
      refreshToken: hashedRefreshToken,
    });

    res.setHeader('Authorization', 'Bearer ' + [accessToken, refreshToken]);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
    });

    res.send({
      message: 'login - success',
      id: user.id,
      name: user.name,
      email: user.email,
      nickname: user.nickname,
      access_token: accessToken,
    });
  }
}
