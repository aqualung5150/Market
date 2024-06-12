import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
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
    });
  }

  async jwtRefreshToken(payload: JwtClaim) {
    return await this.jwtService.signAsync(
      {
        id: payload.id,
        email: payload.email,
      },
      {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
      },
    );
  }

  // async hashJwtToken(token: string) {
  //   const signatue = token.split('.')[2];
  //   const saltOrRounds = 10;
  //   const hashedToken = await bcrypt.hash(signatue, saltOrRounds);
  //   return hashedToken;
  // }
}
