import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { unlinkSync } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(userId: number, data, files?: Express.Multer.File[]) {
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

  async updateProduct(
    productId: number,
    data: UpdateProductDto,
    files: Express.Multer.File[],
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

      // CREAT new images
      if (files) {
        const imagesData = [];
        files.map((file, idx) => {
          // indexing after existing files
          const order = data.existingFiles.length + idx;
          const image = {
            url: file.filename,
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
        unlinkSync(`./uploads/productImages/${image.url}`);
      });
    });
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

  async getUserIdByProductId(productId) {
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

  async createTestDummy() {
    const titles = ['노트북', '스마트폰', '세탁기', '티셔츠', '화장품'];
    const urls = [
      '794f5e0d-349b-43a0-9bf0-464283583fc7.jpeg',
      'a9b95a74-554e-4c9a-8d99-5772885b16f6.jpg',
      '095512f9-3bf2-4d3d-b02a-2b17d5658b8a.jpg',
      '519e1c27-59c0-438c-95e9-83323daef8ba.png',
      '5e18eb63-9b18-4482-9f2c-500a2a3387a3.jpg',
    ];
    for (let i = 0; i < 10000; ++i) {
      // create product
      const res = await this.prisma.product.create({
        data: {
          title: titles[i % 5] + (Math.floor(i / 5) + 1),
          description: 'description' + i,
          price: 10000 + i,
          condition: 0,
          user: {
            connect: {
              id: 8,
            },
          },
          category: {
            connect: {
              id: (i % 5) + 1,
            },
          },
        },
        select: {
          id: true,
        },
      });
      //create image

      const image = {
        url: urls[i % 5],
        order: 0,
        main: true,
        productId: res.id,
      };
      await this.prisma.productImage.create({
        data: image,
      });
    }
    return { message: 'success' };
    // });
  }

  async dummyStatus() {
    for (let i = 1; i <= 20000; i += 7) {
      try {
        await this.prisma.product.update({
          where: {
            id: i,
          },
          data: {
            status: 1,
          },
        });
        console.log(i);
      } catch (err) {}
    }
  }

  async deleteAll() {
    await this.prisma.product.deleteMany();
  }
}
