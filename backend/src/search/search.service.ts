import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts({ keyword, categoryId, page = 1 }) {
    return await this.prisma.product.findMany({
      where: {
        title:
          keyword !== 'undefined'
            ? {
                contains: keyword,
              }
            : undefined,
        categoryId: categoryId ? categoryId : undefined,
      },
      orderBy: {
        createdAt: 'desc',
      },
      // skip: (page - 1) * 10,
      skip: 0,
      take: 10,
      include: {
        images: {
          orderBy: {
            order: 'asc',
          },
        },
        user: {
          select: {
            id: true,
            nickname: true,
            image: true,
          },
        },
      },
    });
  }
}
