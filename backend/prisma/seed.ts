import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
/*
To resolve json file
-> tsconfig.json
"esModuleInterop": true,
"resolveJsonModule": true
*/
import categoryData from '../data/category.json';

const prisma = new PrismaClient();

async function hash(text: string) {
  const saltOrRounds = 10;
  const hashedToken = await bcrypt.hash(text, saltOrRounds);
  return hashedToken;
}

async function main() {
  return prisma.$transaction(async (tx) => {
    // seed admin user
    const hashedPassword = await hash(process.env.ADMIN_PASSWORD);
    await tx.user.upsert({
      where: {
        id: 1,
      },
      update: {},
      create: {
        email: 'admin',
        nickname: 'admin',
        password: hashedPassword,
      },
    });

    // seed categories
    const categories = Object.values(categoryData);
    for (const category of categories) {
      await tx.category.upsert({
        where: {
          id: category.id,
        },
        update: {},
        create: {
          id: category.id,
          title: category.label,
        },
      });
    }
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
