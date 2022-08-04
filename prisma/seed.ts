import Prisma from '@prisma/client';
import parser from '../src/utils/parsers/index.js';
import paths from './seed/files/index.js';
import data from './seed/data/index.js';

const {deputados, states, parties, rankings} = data;

const prisma = new Prisma.PrismaClient();


async function main() {
    console.log('Seeding database...');
    
    console.log('>> Creating States...');
    await prisma.state.createMany({data: states});
    
    console.log('>> Creating Parties...');
    await prisma.politicalParty.createMany({data: parties});
    
    console.log('>> Creating Politicians...');
    await addDeputadosToDatabase();

    console.log('>> Creating Rankings...');
    await prisma.ranking.createMany({data: rankings});
    
    console.log('Seeding database... done!');
}


async function addDeputadosToDatabase() {
    let i = 0;
    const errors = {};
    for (const deputado of deputados) {
        const response = await addDeputadoToDatabase(deputado, i);
        if (response !== true) {
            if (!errors[response.error.code]) {
                errors[response.error.code] = {...response.error, counter: 0, deputados: []};
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
        await prisma.person.create({data: deputado});
        return true;
    } catch(error) {
        return {error, deputado, i};
    }
}


main()
.catch(console.error)
.finally(async () => await prisma.$disconnect());