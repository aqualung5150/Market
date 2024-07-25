// usage - npx ts-node <filename.ts>
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const first = await prisma.product.findFirst({
        select: {
            id: true,
        },
    });
    const count = await prisma.product.count();
    console.log(first.id, count);
    for (let i = first.id; i <= count + first.id; i += 7) {
        try {
            await prisma.product.update({
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

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
