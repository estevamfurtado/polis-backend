import Prisma from '@prisma/client';
import states from './seed.data/states.js';
import politicalParties from './seed.data/parties.js';
import deputadosDados from './seed.data/deputados.js';
import parser from '../src/utils/parsers/index.js';

import path from 'path';
import { fileURLToPath } from 'url';

const prisma = new Prisma.PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const paths = {
    deputadosSeedErrors: path.resolve(__dirname, './seed.data/data.files/json/deputados_seed_errors.json')
}


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
    const deputados = deputadosDados.data;
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
    parser.json.write(errors, paths.deputadosSeedErrors);
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