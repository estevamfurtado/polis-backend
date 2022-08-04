import parser from '../../src/utils/parsers/index.js';
import { Prisma } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const paths = {
    states: path.resolve(__dirname, './data.files/csv/states.csv')
}


const states = parser.csv.read(paths.states) as Prisma.StateCreateInput[];

export default states;
