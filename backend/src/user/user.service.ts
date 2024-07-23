import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import fs from 'fs';
import { contains } from 'class-validator';

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
        email: data.email,
        nickname: data.nickname,
        password: data.password ? data.password : undefined,
      },
      select: {
        id: true,
        email: true,
        nickname: true,
        image: true,
        isDeleted: true,
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
              // fs.unlinkSync(`./uploads/profileImages/${prevImage}`);
              fs.unlink(`uploads/profileImages/thumb/${prevImage}`, () => {});
              fs.unlink(`uploads/profileImages/main/${prevImage}`, () => {});
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
          id: true,
          nickname: true,
          image: true,
          isDeleted: true,
        },
      });

      return res;
    });
  }

  async getUserById(id: number): Promise<UserData> {
    try {
      const res = await this.prisma.user.findUniqueOrThrow({
        where: { id: id },
        select: {
          id: true,
          nickname: true,
          email: true,
          image: true,
          createdAt: true,
          isDeleted: true,
        },
      });
      return res;
    } catch (err) {
      throw new NotFoundException('no such user');
    }
  }

  async getMany({ id, email, nickname }) {
    return await this.prisma.$transaction(async (tx) => {
      const totalSize = await tx.user.count({
        where: {
          id: id,
          email: { contains: email },
          nickname: { contains: nickname },
        },
      });

      const users = await tx.user.findMany({
        where: {
          id: id,
          email: { contains: email },
          nickname: { contains: nickname },
        },
        select: {
          id: true,
          email: true,
          nickname: true,
          isDeleted: true,
        },
      });

      return { totalSize, users };
    });
  }

  async deleteUsers(data) {
    // return await this.prisma.user.updateMany({
    //   where: {
    //     id: {
    //       in: data.users,
    //     },
    //   },
    //   data: {
    //     nickname: {append}
    //     // isDeleted: true,
    //   }
    // });

    return this.prisma.$transaction(async (tx) => {
      for (const userId of data.users) {
        const prevNickname = await tx.user.findUnique({
          where: { id: userId },
          select: { nickname: true },
        });

        await tx.user.update({
          where: { id: userId },
          data: {
            nickname: prevNickname.nickname + '(탈퇴)',
            isDeleted: true,
          },
        });
      }
    });
  }

  // async getUserByEmail(email: string) {
  //   try {
  //     const user = await this.prisma.user.findUniqueOrThrow({
  //       where: {
  //         email: email,
  //       },
  //       select :{
  //         id: true,
  //         nickname: true,

  //       }
  //     })
  //   } catch(err) {
  //     throw new NotFoundException('no such user');
  //   }
  // }
}
