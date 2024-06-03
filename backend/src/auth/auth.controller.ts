import {
  Controller,
  Get,
  Logger,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}
  @Get('google')
  async googleAuth(@Query('code') code: string) {
    if (!code) throw new UnauthorizedException('No code in query string');

    const userData = await this.authService.getGoogleUser(code);

    return {
      name: userData.name,
      email: userData.email,
    };
  }
}
