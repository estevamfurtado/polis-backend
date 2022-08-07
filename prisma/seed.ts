import Prisma from '@prisma/client';
import parser from '../src/utils/parsers/index.js';
import paths from './seed/files/paths.js';
import data from './seed/data/index.js';
import services from '../src/services/index.js';

const { deputados, states, parties, rankings, records } = data;

const prisma = new Prisma.PrismaClient();

async function main() {

    // console.log('>> Creating States...');
    await prisma.state.createMany({ data: states });

    // console.log('>> Creating Parties...');
    await prisma.party.createMany({ data: parties });

    // console.log('>> Creating Politicians...');
    await addDeputadosToDatabase();

    // console.log('>> Creating Rankings...');
    await services.ranking.createMany(rankings);

    // console.log('>> Creating Records...');
    await services.record.createManyEach(records);
    await services.partyRecord.updateAllScores();

    // console.log('>> Creating Album...')
    await services.album.createLastYear();

    console.log('Seeding database... done!');
}


async function addDeputadosToDatabase() {
    for (const deputado of deputados) {
        const response = await addDeputadoToDatabase(deputado);
    }
}

async function addDeputadoToDatabase(deputado: Prisma.Prisma.PersonCreateInput) {
    try {
        await prisma.person.create({ data: deputado });
        return true;
    } catch (error) {
        console.log('erro salvando deputado')
        console.log(deputado)
    }
}



main()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());