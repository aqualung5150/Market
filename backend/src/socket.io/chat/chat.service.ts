import { Injectable, Logger } from '@nestjs/common';
import { connect } from 'http2';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  constructor(private readonly prisma: PrismaService) {}

  async createChannel(userId, toUserId) {
    const channel = await this.prisma.channel.create({
      include: {
        users: {
          select: {
            user: {
              select: {
                id: true,
                nickname: true,
              },
            },
          },
        },
      },
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
      include: {
        sender: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
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

  async getChannelsByUserId(userId) {
    const channels = await this.prisma.channel.findMany({
      select: {
        id: true,

        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            body: true,
            createdAt: true,
            read: true,
          },
          take: 1,
        },
        users: {
          select: {
            user: {
              select: {
                id: true,
                nickname: true,
              },
            },
          },
        },
      },
      where: {
        users: {
          some: {
            userId: userId,
          },
        },
      },
    });

    // sort by lasted message
    channels.sort(function (a, b) {
      if (a.messages[0].createdAt > b.messages[0].createdAt) return -1;
    });

    return channels;
  }

  async getChannelByChannelId(channelId) {
    const channel = await this.prisma.channel.findUnique({
      include: {
        users: {
          select: {
            user: {
              select: {
                id: true,
                nickname: true,
              },
            },
          },
        },
      },
      where: {
        id: channelId,
      },
    });

    return channel;
  }

  async getUsersByChannelId(channelId) {
    const users = await this.prisma.user.findMany({
      include: {
        channels: {
          include: {
            channel: true,
          },
        },
      },
      where: {
        channels: {
          some: {
            channelId: channelId,
          },
        },
      },
    });

    return users;
  }

  async getMessagesByChannelId(channelId) {
    const messages = await this.prisma.message.findMany({
      include: {
        sender: true,
      },
      where: {
        channelId: channelId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return messages;
  }
}
