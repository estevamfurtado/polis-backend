import Prisma from '@prisma/client';
import parser from '../src/utils/parsers/index.js';
import paths from './seed/files/paths.js';
import data from './seed/data/index.js';
import services from '../src/services/index.js';

const { deputados, states, parties, rankings, records } = data;

const prisma = new Prisma.PrismaClient();

async function main() {

    console.log('>> Creating States...');
    await services.state.createMany(states);

    console.log('>> Creating Parties...');
    await services.party.createMany(parties);

    console.log('>> Creating Politicians...');
    await services.person.create.manyEach(deputados);

    console.log('>> Creating Rankings...');
    await services.ranking.createMany(rankings);

    console.log('>> Creating Party Records...');
    await services.partyRecord.populate();

    console.log('>> Creating Records...');
    await services.record.createManyEach(records);

    console.log('>> Updating Scores...');
    await services.partyRecord.updateAllScores();

    console.log('>> Creating Album...')
    await services.album.createLastYear();

    console.log('Seeding database... done!');
}


main()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());