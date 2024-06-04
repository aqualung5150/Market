import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    const res = await this.prisma.user.upsert({
      where: {
        email: data.email,
      },
      update: {},
      create: {
        name: data.name,
        email: data.email,
        nickname: 'Crawler',
      },
      select: {
        id: true,
        name: true,
        email: true,
        nickname: true,
        // is2faEnabled: true,
      },
    });

    const returnData = {
      id: res.id,
      name: res.name,
      email: res.email,
      nickname: res.nickname,
    };

    return returnData;
  }

  async findUserById(userId: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async updateUserById(id: number, data: Prisma.UserUpdateInput) {
    await this.prisma.user.update({
      where: { id: id },
      data: {
        ...data,
      },
    });
  }

  async getUserById(id: number) {
    return await this.prisma.user.findUniqueOrThrow({
      where: { id: id },
      select: {
        id: true,
        nickname: true,
        email: true,
        image: true,
        lastLogin: true,
      },
    });
  }
}
