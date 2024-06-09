import {
  Controller,
  Get,
  Logger,
  Query,
  Res,
  UseGuards,
  Req,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('google')
  async googleAuth(@Res() res: Response, @Query('code') code: string) {
    const userData = await this.authService.getGoogleUser(code);

    const user = await this.userService.createUser({
      name: userData.name,
      email: userData.email,
    });

    // const accessToken = await this.authService.jwtAccessToken({
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    // });

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

    // res.setHeader('Authorization', 'Bearer ' + [accessToken, refreshToken]);
    // res.cookie('access_token', accessToken, {
    //   httpOnly: true,
    // });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      // secure:true, <- ssl프로토콜 구현하자. todo
    });

    const decode = this.jwtService.decode<JwtPayload>(refreshToken);

    res.send({
      message: 'login - success',
      id: decode.id,
      name: decode.name,
      email: decode.email,
      nickname: user.nickname,
      iat: decode.iat,
      exp: decode.exp,
    });

    // res.send({
    //   message: 'login - success',
    //   access_token: accessToken,
    // });
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const user = await this.userService.findUserById(req.user.id);

    const accessToken = await this.authService.jwtAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    // res.setHeader('Authorization', 'Bearer ' + accessToken);
    // res.cookie('access_token', accessToken, {
    //   httpOnly: true,
    // });

    const decode = this.jwtService.decode<JwtPayload>(accessToken);

    return res.send({
      message: 'new access token is generated',
      id: decode.id,
      name: decode.name,
      email: decode.email,
      nickname: user.nickname,
      iat: decode.iat,
      exp: decode.exp,
      access_token: accessToken,
    });
  }

  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    await this.userService.updateUserById(req.user.id, {
      refreshToken: null,
    });
    res.clearCookie('refresh_token');
    // this.chatGateway.logout(req.user.id);
    return res.send({
      message: 'logout - success',
    });
  }
}
