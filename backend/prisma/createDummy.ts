// usage - npx ts-node <filename.ts>
import { PrismaClient } from '@prisma/client';

const prisma= new PrismaClient();

async function main() {
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
    for (let i = 0; i < 5000; ++i) {
      // create product
      const res= await prisma.product.create({
        data: {
          title: titles[i % 5] + (Math.floor(i / 5) + 1),
          description: `${Math.floor(i / 5) + 1}번째 ${titles[i % 5]}입니다.`,
          price: 10000 + i,
          condition: 0,
          user: {
            connect: {
              id: 2,
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
      await prisma.productImage.createMany({
        data: imagesData,
      });
    }
    return { message: 'success' };
}

main()
  .then(() => console.log('success'))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
