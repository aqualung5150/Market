// usage - npx ts-node <filename.ts>
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.product.deleteMany();
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
