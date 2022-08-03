import Prisma from '@prisma/client';

const prisma = new Prisma.PrismaClient();



async function main() {
}

main()
.catch(console.error)
.finally(async () => await prisma.$disconnect());