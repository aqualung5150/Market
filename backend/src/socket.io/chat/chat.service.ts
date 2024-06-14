import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createChannel(userId, toUserId) {
    const channel = await this.prisma.channel.create({
      data: {
        users: {
          create: [
            {
              user: {
                connect: {
                  id: userId,
                },
              },
            },
            {
              user: {
                connect: {
                  id: toUserId,
                },
              },
            },
          ],
        },
      },
    });

    return channel;
  }

  async createMessage(body: string, senderId, channelId) {
    const message = await this.prisma.message.create({
      data: {
        body: body,
        sender: {
          connect: {
            id: senderId,
          },
        },
        channel: {
          connect: {
            id: channelId,
          },
        },
      },
    });

    return message;
  }

  async getChannelByUserId(userId) {
    const channels = await this.prisma.channel.findMany({
      include: {
        messages: true,
        users: true,
      },
      where: {
        users: {
          some: {
            userId: userId,
          },
        },
      },
    });

    return channels;
  }

  //   async getChannelsByUserId(userId) {
  //     const channels = await this.prisma.channel.findMany({
  //         where: {

  //         },
  //       include: {
  //         users: true
  //       },
  //     });

  //     return channels;
  //   }
}
