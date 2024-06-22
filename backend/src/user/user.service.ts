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
        // is2faEnabled: true,
      },
    });

    // const returnData = {
    //   id: res.id,
    //   name: res.name,
    //   email: res.email,
    //   nickname: res.nickname,
    // };

    // return returnData;
  }

  async findUserById(userId: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async updateUserById(
    id: number,
    data: Prisma.UserUpdateInput,
    file?: Express.Multer.File,
  ) {
    let prevImagePath: string;
    if (file) {
      prevImagePath = await this.prisma.user
        .findUnique({
          where: {
            id: id,
          },
          select: {
            image: true,
          },
        })
        .then((res) => res.image);
    }

    return await this.prisma.user
      .update({
        where: { id: id },
        data: {
          ...data,
          id: undefined,
          email: undefined,
          createdAt: undefined,
          image: file ? file.filename : undefined,
        },
        select: {
          image: true,
        },
      })
      .then(() => {
        if (prevImagePath && prevImagePath != 'default.png') {
          try {
            fs.unlinkSync(`./uploads/profileimages/${prevImagePath}`);
          } catch (err) {
            console.error(err);
          }
        }
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
        // lastLogin: true,
      },
    });
  }
}
