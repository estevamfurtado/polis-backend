import Prisma from '@prisma/client';
import states from './seed.data/get/states.js';
import politicalParties from './seed.data/get/parties.js';
import deputados from './seed.data/get/deputados.js';
import parser from '../src/utils/parsers/index.js';
import paths from './seed.data/data.files/index.js';

const prisma = new Prisma.PrismaClient();


async function main() {
    console.log('Seeding database...');
    console.log('>> Creating States...');
    await prisma.state.createMany({data: states});
    console.log('>> Creating Parties...');
    await prisma.politicalParty.createMany({data: politicalParties});
    console.log('>> Creating Politicians...');
    await addDeputadosToDatabase();
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


// -----

main()
.catch(console.error)
.finally(async () => await prisma.$disconnect());