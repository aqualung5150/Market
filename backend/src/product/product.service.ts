import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { unlinkSync } from 'fs';
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

      return product.id;
    });
  }

  async getProduct(id: number) {
    try {
      const res = await this.prisma.product.findUniqueOrThrow({
        where: {
          id: id,
        },
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
      return res;
    } catch (err) {
      throw new NotFoundException('no such product');
    }
  }

  // Move to search Controller
  // async getProductMany({ title, categoryId, page = 1 }) {
  //   return await this.prisma.product.findMany({
  //     where: {
  //       title: title ? title : undefined,
  //       categoryId: categoryId ? categoryId : undefined,
  //     },
  //     include: {
  //       images: {
  //         orderBy: {
  //           order: 'asc',
  //         },
  //       },
  //       user: {
  //         select: {
  //           id: true,
  //           nickname: true,
  //           image: true,
  //         },
  //       },
  //     },
  //   });
  // }

  async getProductUserId(productId) {
    return await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        user: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  async deleteProduct(productId) {
    return await this.prisma.$transaction(async (tx) => {
      // get url of images
      const images = await tx.product.findUnique({
        where: {
          id: productId,
        },
        select: {
          images: {
            select: {
              url: true,
            },
          },
        },
      });
      // delete Product
      await tx.product.delete({
        where: {
          id: productId,
        },
      });
      // delete image files
      images.images.map((image) => {
        unlinkSync(`./uploads/productImages/${image.url}`);
      });
    });
  }
}
