import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { unlink, unlinkSync } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(
    userId: number,
    data: CreateProductDto,
    filenames: string[],
  ) {
    return await this.prisma.$transaction(async (tx) => {
      // create product
      const product = await tx.product.create({
        data: {
          title: data.title,
          description: data.description,
          price: data.price,
          condition: data.condition,
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
      filenames.map((filename, idx) => {
        const image = {
          url: filename,
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
          NOT: {
            user: {
              isDeleted: true,
            },
          },
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
              isDeleted: true,
            },
          },
        },
      });
      return res;
    } catch (err) {
      throw new NotFoundException('no such product');
    }
  }

  async updateProduct(
    productId: number,
    data: UpdateProductDto,
    filenames: string[],
  ) {
    return await this.prisma.$transaction(async (tx) => {
      // DELETE
      const deletedImages = await tx.productImage.findMany({
        where: {
          productId: productId,
          url: { notIn: data.existingFiles },
        },
        select: {
          url: true,
        },
      });
      // delete from database
      await tx.productImage.deleteMany({
        where: {
          productId: productId,
          url: { notIn: data.existingFiles },
        },
      });

      // arrange order of existing ProductImage
      data.existingFiles.forEach(async (e, idx) => {
        await tx.productImage.updateMany({
          where: {
            productId: productId,
            url: e,
          },
          data: {
            order: idx,
            main: idx === 0 ? true : undefined,
          },
        });
      });

      // CREATE new images
      if (filenames) {
        const imagesData = [];
        filenames.map((filename, idx) => {
          // indexing after existing files
          const order = data.existingFiles.length + idx;
          const image = {
            url: filename,
            order: order,
            main: order === 0 ? true : false,
            productId: productId,
          };
          imagesData.push(image);
        });

        await tx.productImage.createMany({
          data: imagesData,
        });
      }

      // UPDATE Product
      await tx.product.update({
        where: {
          id: productId,
        },
        data: {
          title: data.title,
          price: data.price,
          description: data.description,
          categoryId: data.categoryId,
          condition: data.condition,
        },
      });

      // delete images from storage
      deletedImages.map((image) => {
        unlink(`uploads/productImages/thumb/${image.url}`, () => {});
        unlink(`uploads/productImages/main/${image.url}`, () => {});
      });
    });
  }

  async changeProductStatus(productId: number, status: number) {
    return await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        status: status,
      },
    });
  }

  async getUserIdByProductId(productId: number) {
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

  async deleteProduct(productId: number) {
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
        unlink(`uploads/productImages/thumb/${image.url}`, () => {});
        unlink(`uploads/productImages/main/${image.url}`, () => {});
      });
    });
  }

  async deleteProducts(data: { products: number[] }) {
    return await this.prisma.$transaction(async (tx) => {
      const images = await tx.product.findMany({
        where: {
          id: {
            in: data.products,
          },
        },
        select: {
          images: {
            select: {
              url: true,
            },
          },
        },
      });

      await tx.product.deleteMany({
        where: {
          id: { in: data.products },
        },
      });

      images.forEach((imageSet) => {
        imageSet.images.forEach((image) => {
          unlink(`uploads/productImages/thumb/${image.url}`, () => {});
          unlink(`uploads/productImages/main/${image.url}`, () => {});
        });
      });
    });
  }
}
