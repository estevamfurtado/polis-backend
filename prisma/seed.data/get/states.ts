import { Prisma } from '@prisma/client';
import { fileURLToPath } from 'url';
import parsers from '../../../src/utils/parsers/index.js';
import paths from '../data.files/index.js'


const states = parsers.json.read(paths.json.seed.states).data as Prisma.StateCreateInput[];

export default states;
