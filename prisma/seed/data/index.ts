import parser from '../../../src/utils/parsers/index.js';
import { Prisma } from '@prisma/client';
import paths from '../files/paths.js'

export default {
    deputados: parser.json.read(paths.json.seed.deputados).data as Prisma.PersonCreateInput[],
    parties: parser.json.read(paths.json.seed.parties).data as Prisma.PartyCreateInput[],
    rankings: parser.json.read(paths.json.seed.rankings).data as Prisma.RankingCreateInput[],
    states: parser.json.read(paths.json.seed.states).data as Prisma.StateCreateInput[],
    records: parser.json.read(paths.json.seed.records).data as Prisma.RecordCreateInput[],
};