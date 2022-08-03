import Prisma from '@prisma/client';
import states from '../src/utils/seedData/states.js';
import politicalParties from '../src/utils/seedData/parties.js';

const prisma = new Prisma.PrismaClient();




async function main() {
    console.log(politicalParties);
}

main()
.catch(console.error)
.finally(async () => await prisma.$disconnect());