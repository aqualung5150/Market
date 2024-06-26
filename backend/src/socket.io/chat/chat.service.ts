import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  constructor(private readonly prisma: PrismaService) {}

  async createChannel(userId, sendTo, body) {
    return this.prisma.$transaction(async (tx) => {
      // create channel
      const channel = await tx.channel.create({
        include: {
          users: {
            select: {
              user: {
                select: {
                  id: true,
                  nickname: true,
                  image: true,
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
                    id: sendTo,
                  },
                },
              },
            ],
          },
        },
      });
      // create message
      const message = await tx.message.create({
        select: {
          id: true,
          body: true,
          read: true,
          createdAt: true,
          channelId: true,
          sender: {
            select: {
              id: true,
              nickname: true,
              image: true,
            },
          },
        },
        data: {
          body: body,
          sender: {
            connect: {
              id: userId,
            },
          },
          channel: {
            connect: {
              id: channel.id,
            },
          },
        },
      });

      return { channel, message };
    });
  }

  async createMessage(body: string, senderId, channelId) {
    console.log(senderId);
    return this.prisma.$transaction(async (tx) => {
      // create message
      const message = await tx.message.create({
        select: {
          id: true,
          body: true,
          read: true,
          createdAt: true,
          channelId: true,
          sender: {
            select: {
              id: true,
              nickname: true,
              image: true,
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
      // get users in channel
      const users = await tx.user.findMany({
        select: {
          id: true,
          nickname: true,
          image: true,
        },
        where: {
          channels: {
            some: {
              channelId: channelId,
            },
          },
        },
      });
      return { message, users };
    });
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
            id: true,
            body: true,
            createdAt: true,
            read: true,
            sender: {
              select: {
                id: true,
              },
            },
          },
          take: 1,
        },
        users: {
          select: {
            user: {
              select: {
                id: true,
                nickname: true,
                image: true,
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

    return channels;
  }

  async getChannelByChannelId(channelId) {
    const channel = await this.prisma.channel.findUnique({
      select: {
        id: true,
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            body: true,
            createdAt: true,
            read: true,
            sender: {
              select: {
                id: true,
              },
            },
          },
          take: 1,
        },
        users: {
          select: {
            user: {
              select: {
                id: true,
                nickname: true,
                image: true,
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
      select: {
        id: true,
        nickname: true,
        image: true,
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
      select: {
        id: true,
        body: true,
        read: true,
        createdAt: true,
        channelId: true,
        sender: {
          select: {
            id: true,
            nickname: true,
            image: true,
          },
        },
      },
      where: {
        channelId: channelId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return messages;
  }

  async deleteChannelByChannelId(channelId) {
    await this.prisma.channel.delete({
      where: {
        id: channelId,
      },
    });
  }

  async readMessages(userId, channelId) {
    await this.prisma.message.updateMany({
      where: {
        channelId: channelId,
        NOT: {
          senderId: userId,
        },
      },
      data: {
        read: true,
      },
    });
  }
}
