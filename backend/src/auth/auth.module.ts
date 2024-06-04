import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user/user.module';
import { UserService } from 'src/user/user/user.service';

@Module({
  imports: [
    UserModule,
    HttpModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
