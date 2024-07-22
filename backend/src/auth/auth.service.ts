import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom } from 'rxjs';
import bcrypt from 'bcryptjs';
import { SignInDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async getGoogleUser(code: string) {
    const tokenData = await lastValueFrom(
      this.httpService.post(process.env.GOOGLE_OAUTH_URL, {
        grant_type: process.env.GOOGLE_OAUTH_GRANT_TYPE,
        code: code,
        client_id: process.env.GOOGLE_OAUTH_ID,
        client_secret: process.env.GOOGLE_OAUTH_SECRET,
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT,
      }),
    );

    const accessToken = tokenData.data.access_token;

    const userData = await lastValueFrom(
      this.httpService.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    );

    return userData.data;
  }

  async jwtAccessToken(payload: JwtClaim) {
    return await this.jwtService.signAsync({
      id: payload.id,
      email: payload.email,
      role: payload.role,
    });
  }

  async jwtRefreshToken(payload: JwtClaim) {
    return await this.jwtService.signAsync(
      {
        id: payload.id,
        email: payload.email,
        role: payload.role,
      },
      {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
      },
    );
  }

  async hash(text: string) {
    const saltOrRounds = 10;
    const hashedToken = await bcrypt.hash(text, saltOrRounds);
    return hashedToken;
  }

  async signIn(data: SignInDto): Promise<UserData> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
        isDeleted: false,
      },
      select: {
        id: true,
        nickname: true,
        password: true,
        image: true,
      },
    });
    if (!user) throw new NotFoundException('no such email');

    const isMatched = await bcrypt.compare(data.password, user.password);

    if (!isMatched) {
      throw new UnauthorizedException('password not matched');
    }

    return {
      id: user.id,
      email: data.email,
      nickname: user.nickname,
      image: user.image,
    };
  }

  async isUniqueEmail(email: string): Promise<Boolean> {
    const target = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
      },
    });

    if (!target) return true;
    return false;
  }
}
