import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtGuard],
  exports: [UserService],
})
export class UserModule {}
