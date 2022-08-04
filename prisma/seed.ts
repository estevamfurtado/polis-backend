import Prisma from '@prisma/client';
import parser from '../src/utils/parsers/index.js';
import paths from './seed/files/paths.js';
import data from './seed/data/index.js';

const { deputados, states, parties, rankings, records } = data;

const prisma = new Prisma.PrismaClient();

async function main() {

    console.log(`# states: ${states.length}`)
    console.log(`# parties: ${parties.length}`)
    console.log(`# deputados: ${deputados.length}`)
    console.log(`# rankings: ${rankings.length}`)
    console.log(`# records: ${records.length}`)



    console.log('Seeding database...');

    console.log('>> Creating States...');
    await prisma.state.createMany({ data: states });

    console.log('>> Creating Parties...');
    await prisma.politicalParty.createMany({ data: parties });

    console.log('>> Creating Politicians...');
    await addDeputadosToDatabase();

    console.log('>> Creating Rankings...');
    await prisma.ranking.createMany({ data: rankings });

    console.log('>> Creating Records...');
    await addRecordsToDatabase();

    console.log('Seeding database... done!');
}


async function addDeputadosToDatabase() {
    let i = 0;
    const errors = {};
    for (const deputado of deputados) {
        const response = await addDeputadoToDatabase(deputado, i);
        if (response !== true) {
            if (!errors[response.error.code]) {
                errors[response.error.code] = { ...response.error, counter: 0, deputados: [] };
            }
            errors[response.error.code].counter++;
            errors[response.error.code].deputados.push(response.deputado.name);
        }
        i++;
    }
    parser.json.write(errors, paths.json.errors.seedDeputados);
}

async function addDeputadoToDatabase(deputado: Prisma.Prisma.PersonCreateInput, i: number) {
    try {
        await prisma.person.create({ data: deputado });
        return true;
    } catch (error) {
        return { error, deputado, i };
    }
}

async function addRecordsToDatabase() {
    let i = 0;
    const errors = {};
    for (const record of records) {
        const response = await addRecordToDatabase(record, i);
        if (response !== true) {
            if (!errors[response.error.code]) {
                console.log('');
                console.log('---------> ERROR');
                console.log(response.error);
                errors[response.error.code] = { ...response.error, counter: 0, records: [] };
            }
            errors[response.error.code].counter++;
        }
        i++;
    }
    parser.json.write(errors, paths.json.errors.seedRecords);
}

async function addRecordToDatabase(record: Prisma.Prisma.PoliticianInRankingCreateInput, i: number) {
    try {
        await prisma.politicianInRanking.create({ data: record });
        return true;
    } catch (error) {
        return { error, record, i };
    }
}


main()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());