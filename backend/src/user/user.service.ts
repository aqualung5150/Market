import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    return await this.prisma.user.upsert({
      where: {
        email: data.email,
      },
      update: {},
      create: {
        name: data.name,
        email: data.email,
        nickname: data.nickname,
      },
      select: {
        id: true,
        name: true,
        email: true,
        nickname: true,
        image: true,
      },
    });
  }

  async findUserById(userId: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async updateUser(
    id: number,
    data: Prisma.UserUpdateInput,
    filename?: string,
  ) {
    return await this.prisma.$transaction(async (tx) => {
      // previous image path
      let prevImage: string = undefined;
      if (filename) {
        const res = await tx.user.findUnique({
          where: {
            id: id,
          },
          select: {
            image: true,
          },
        });
        prevImage = res.image;
      }
      // update
      await tx.user
        .update({
          where: { id: id },
          data: {
            ...data,
            image: filename ? filename : undefined,
            id: undefined,
            email: undefined,
            createdAt: undefined,
          },
        })
        // remove previous image file
        .then(() => {
          if (prevImage && prevImage !== 'default.png') {
            try {
              fs.unlinkSync(`./uploads/profileImages/${prevImage}`);
            } catch (err) {
              console.error(err);
            }
          }
        });
      // get updated data
      const res = await tx.user.findUnique({
        where: {
          id: id,
        },
        select: {
          name: true,
          nickname: true,
          image: true,
        },
      });

      return res;
    });
  }

  async getUserById(id: number): Promise<UserData> {
    return await this.prisma.user.findUniqueOrThrow({
      where: { id: id },
      select: {
        id: true,
        name: true,
        nickname: true,
        email: true,
        image: true,
        createdAt: true,
      },
    });
  }
}
