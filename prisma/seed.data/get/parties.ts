import parsers from '../../../src/utils/parsers/index.js';
import { Prisma } from '@prisma/client';
import paths from '../data.files/index.js'


const parties = parsers.json.read(paths.json.seed.parties).data as Prisma.PoliticalPartyCreateInput[];

export default parties;