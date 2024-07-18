import {
  Controller,
  Get,
  Logger,
  Query,
  Res,
  UseGuards,
  Req,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from './guard/jwt.guard';
import { SignInDto, SignUpDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signIn')
  async login(@Res() res: Response, @Body() data: SignInDto) {
    const user = await this.authService.signIn(data);
    // generate tokens
    const accessToken = await this.authService.jwtAccessToken({
      id: user.id,
      email: user.email,
      role: user.id === 1 ? 'admin' : 'user',
    });
    const refreshToken = await this.authService.jwtRefreshToken({
      id: user.id,
      email: user.email,
      role: user.id === 1 ? 'admin' : 'user',
    });
    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      // secure:true, <- ssl프로토콜 구현하자. todo
    });

    const decode = this.jwtService.decode<JwtPayload>(accessToken);

    res.send({
      message: 'success',
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      image: user.image,
      iat: decode.iat,
      exp: decode.exp,
    });
  }

  @Post('signUp')
  async signUp(@Res() res: Response, @Body() data: SignUpDto) {
    if (!(await this.authService.isUniqueEmail(data.email))) {
      throw new BadRequestException('you are already joined.');
    }
    // hash
    const hashedPassword = await this.authService.hash(data.password);
    data.password = hashedPassword;
    // create user
    await this.userService.createUser(data);

    // return success
    return res.send({
      message: 'success',
    });
  }

  @Post('signUp/available')
  async emailAvailable(@Body() data: { email: string }) {
    // if (await this.authService.isUniqueEmail(data.email))
    //   return { message: 'unique' };
    // else return { message: 'not unique' };

    return { success: await this.authService.isUniqueEmail(data.email) };
  }

  @Post('google')
  async googleAuth(@Res() res: Response, @Query('code') code: string) {
    const userData = await this.authService.getGoogleUser(code);
    const user = await this.userService.createUser({
      email: userData.email,
      nickname:
        userData.name.length < 2 ? 'default' : userData.name.substring(0, 18),
    });

    const accessToken = await this.authService.jwtAccessToken({
      id: user.id,
      email: user.email,
      role: 'user',
    });

    const refreshToken = await this.authService.jwtRefreshToken({
      id: user.id,
      email: user.email,
      role: 'user',
    });

    // const hashedRefreshToken =
    //   await this.authService.hashJwtToken(refreshToken);

    // this.userService.updateUserById(user.id, {
    //   refreshToken: hashedRefreshToken,
    // });

    // res.setHeader('Authorization', 'Bearer ' + [accessToken, refreshToken]);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      // secure:true, <- ssl프로토콜 구현하자. todo
    });

    const decode = this.jwtService.decode<JwtPayload>(accessToken);

    return res.send({
      message: 'success',
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      image: user.image,
      iat: decode.iat,
      exp: decode.exp,
    });

    // res.send({
    //   message: 'login - success',
    //   access_token: accessToken,
    // });
  }

  @UseGuards(JwtGuard)
  @Post('check')
  check() {
    return {
      message: 'valid access token',
    };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const user = await this.userService.findUserById(req.user.id);

    const accessToken = await this.authService.jwtAccessToken({
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
    });

    // res.setHeader('Authorization', 'Bearer ' + accessToken);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });

    const decode = this.jwtService.decode<JwtPayload>(accessToken);

    return res.send({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      image: user.image,
      iat: decode.iat,
      exp: decode.exp,
    });
  }

  // @UseGuards(JwtRefreshGuard)
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    // await this.userService.updateUserById(req.user.id, {
    //   refreshToken: null,
    // });

    res.clearCookie('access_token', {
      httpOnly: true,
    });
    res.clearCookie('refresh_token', {
      httpOnly: true,
    });
    // this.chatGateway.logout(req.user.id);
    return res.send({
      message: 'logout - success',
    });
  }
}
