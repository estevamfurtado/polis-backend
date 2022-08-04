import parser from '../../src/utils/parsers/index.js';
import { Prisma } from '@prisma/client';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const paths = {
    politicalParties: path.resolve(__dirname, './data.files/csv/politicalParties.csv')
}

const politicalParties = parser.csv.read(paths.politicalParties) as Prisma.PoliticalPartyCreateInput[];

export default politicalParties;