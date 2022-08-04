import parser from '../../../src/utils/parsers/index.js';
import { Prisma } from '@prisma/client';
import paths from '../data.files/index.js'

const deputados = parser.json.read(paths.json.seed.deputados).data as Prisma.PersonCreateInput[]
export default deputados;
