import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getGoogleUser(code: string) {
    const tokenReq = this.httpService.post(
      this.configService.get<string>('GOOGLE_OAUTH_URL'),
      {
        grant_type: this.configService.get<string>('GOOGLE_OAUTH_GRANT_TYPE'),
        code: code,
        client_id: this.configService.get<string>('GOOGLE_OAUTH_ID'),
        client_secret: this.configService.get<string>('GOOGLE_OAUTH_SECRET'),
        redirect_uri: this.configService.get<string>('GOOGLE_OAUTH_REDIRECT'),
      },
    );

    const tokenData = await lastValueFrom(tokenReq);

    const accessToken = tokenData.data.access_token;

    this.logger.debug(accessToken);

    const userReq = this.httpService.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    const userData = await lastValueFrom(userReq);

    return userData.data;
  }
}
