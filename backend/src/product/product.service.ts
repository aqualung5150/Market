import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Express } from 'express';
import { connect } from 'http2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(userId: number, data, files: Express.Multer.File[]) {
    return await this.prisma.$transaction(async (tx) => {
      // create product
      const product = await tx.product.create({
        data: {
          title: data.title,
          description: data.description,
          price: data.price,
          status: data.status,
          user: {
            connect: {
              id: userId,
            },
          },
          category: {
            connect: {
              id: data.categoryId,
            },
          },
        },
        select: {
          id: true,
        },
      });
      // create images
      const imagesData = [];
      files.map((file, idx) => {
        const image = {
          url: file.filename,
          order: idx,
          main: idx === 0 ? true : false,
          productId: product.id,
        };
        imagesData.push(image);
      });
      await tx.productImage.createMany({
        data: imagesData,
      });
      // get product data
      //   const res = await tx.product.findUnique({
      //     where: {
      //       id: product.id,
      //     },
      //     select: {
      //       id: true,
      //       title: true,
      //       status: true,
      //       description: true,
      //       price: true,
      //       createdAt: true,
      //       user: {
      //         select: {
      //           id: true,
      //           nickname: true,
      //         },
      //       },
      //       category: true,
      //       images: true,
      //     },
      //   });

      //   return res;

      return product.id;
    });
  }
}
