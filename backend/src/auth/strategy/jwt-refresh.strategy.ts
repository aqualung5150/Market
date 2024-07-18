import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.refresh_token;
        },
      ]),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.cookies.refresh_token;

    const user = await this.userService.findUserById(payload.id);

    if (!user) {
      throw new UnauthorizedException('no such user in database');
    }

    // if (!user.refreshToken) {
    //   throw new UnauthorizedException('no refresh token on user');
    // }

    // const signature = refreshToken.split('.')[2];

    // if (await bcrypt.compare(signature, user.refreshToken)) {
    //   return {
    //     id: payload.id,
    //     email: payload.email,
    //     iat: payload.iat,
    //     exp: payload.exp,
    //   };
    // }

    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      iat: payload.iat,
      exp: payload.exp,
    };
  }
}
