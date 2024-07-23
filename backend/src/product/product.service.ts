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

  // TEST
  async createTestDummy() {
    const titles = ['노트북', '스마트폰', '세탁기', '티셔츠', '화장품'];
    const urls = [
      ['dummy_laptop1.jpg', 'dummy_laptop2.jpg', 'dummy_laptop3.jpg'],
      ['dummy_phone1.jpg', 'dummy_phone2.jpg', 'dummy_phone3.jpg'],
      ['dummy_laundry1.jpg', 'dummy_laundry2.jpg', 'dummy_laundry3.jpg'],
      [
        'dummy_tshirts1.jpg',
        'dummy_tshirts2.jpg',
        'dummy_tshirts3.jpg',
        'dummy_tshirts4.jpg',
      ],
      ['dummy_cosmetic1.jpg', 'dummy_cosmetic2.jpg'],
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
              id: 1,
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
      const imagesData = [];
      // indexing after existing files
      for (let cur = 0; cur < urls[i % 5].length; ++cur) {
        const image = {
          url: urls[i % 5][cur],
          order: cur,
          main: cur === 0 ? true : false,
          productId: res.id,
        };
        imagesData.push(image);
      }
      await this.prisma.productImage.createMany({
        data: imagesData,
      });
    }
    return { message: 'success' };
    // });
  }

  async dummyStatus() {
    const first = await this.prisma.product.findFirst({
      select: {
        id: true,
      },
    });
    const count = await this.prisma.product.count();
    console.log(first.id, count);
    for (let i = first.id; i <= count + first.id; i += 7) {
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
