import {
  Controller,
  Get,
  Logger,
  Query,
  UnauthorizedException,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user/user.service';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';

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

    const user = await this.userService.createUser({
      name: userData.name,
      email: userData.email,
    });

    const accessToken = await this.authService.jwtAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    const refreshToken = await this.authService.jwtRefreshToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    const hashedRefreshToken =
      await this.authService.hashJwtToken(refreshToken);

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

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const user = await this.userService.findUserById(req.user.id);

    const access_token = await this.authService.jwtAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    res.setHeader('Authorization', 'Bearer ' + access_token);
    res.cookie('access_token', access_token, {
      httpOnly: true,
    });
    return res.send({
      message: 'generate new access token',
      access_token: access_token,
      access_token_exp: process.env.JWT_ACCESS_EXPIRATION_TIME,
    });
  }
}
