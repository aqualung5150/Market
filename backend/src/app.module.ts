import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './socket.io/chat/chat.module';
import { PrismaService } from './prisma/prisma.service';
import { ProductModule } from './product/product.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    ChatModule,
    ProductModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
