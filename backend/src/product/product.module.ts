import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, JwtGuard],
})
export class ProductModule {}
