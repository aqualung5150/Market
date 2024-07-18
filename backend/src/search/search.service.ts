import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts({
    id,
    keyword,
    categoryId,
    page = 1,
    minPrice,
    maxPrice,
    status,
    condition,
    userId,
  }) {
    return await this.prisma.$transaction(async (tx) => {
      const totalSize = await tx.product.count({
        where: {
          id: id,
          userId: userId,
          title: keyword ? { contains: keyword } : undefined,
          categoryId: categoryId ? categoryId : undefined,
          price: {
            gte: minPrice ? minPrice : undefined,
            lte: maxPrice ? maxPrice : undefined,
          },
          status: status,
          condition: condition,
          NOT: {
            user: {
              isDeleted: true,
            },
          },
        },
      });

      const products = await tx.product.findMany({
        where: {
          id: id,
          userId: userId,
          title: keyword ? { contains: keyword } : undefined,
          categoryId: categoryId ? categoryId : undefined,
          price: {
            gte: minPrice ? minPrice : undefined,
            lte: maxPrice ? maxPrice : undefined,
          },
          status: status,
          condition: condition,
          NOT: {
            user: {
              isDeleted: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * 20,
        take: 20,
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
              isDeleted: true,
            },
          },
        },
      });

      return { totalSize, products };
    });
  }

  async getProductsByUserId({ userId, page }) {
    return await this.prisma.$transaction(async (tx) => {
      const totalSize = tx.product.count({
        where: {
          userId: userId,
        },
      });

      const products = await tx.product.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * 20,
        take: 20,
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
              isDeleted: true,
            },
          },
        },
      });

      return { totalSize, products };
    });
  }

  // async getProductsList({
  //   keyword,
  //   categoryId,
  //   page = 1,
  //   minPrice,
  //   maxPrice,
  //   status,
  //   condition,
  // }) {
  //   return await this.prisma.$transaction(async (tx) => {
  //     const totalSize = await tx.product.count({
  //       where: {
  //         title: keyword ? { contains: keyword } : undefined,
  //         categoryId: categoryId ? categoryId : undefined,
  //       },
  //     });

  //     const products = await this.prisma.product.findMany({
  //       where: {
  //         title: keyword ? { contains: keyword } : undefined,
  //         categoryId: categoryId ? categoryId : undefined,
  //         price: {
  //           gte: minPrice ? minPrice : undefined,
  //           lte: maxPrice ? maxPrice : undefined,
  //         },
  //         status: status,
  //         condition: condition,
  //       },
  //       orderBy: {
  //         createdAt: 'desc',
  //       },
  //       skip: (page - 1) * 20,
  //       take: 20,
  //       include: {
  //         // images: {
  //         //   orderBy: {
  //         //     order: 'asc',
  //         //   },
  //         // },
  //         user: {
  //           select: {
  //             id: true,
  //             // nickname: true,
  //             // image: true,
  //           },
  //         },
  //       },
  //     });

  //     return { totalSize, products };
  //   });
  // }
}
