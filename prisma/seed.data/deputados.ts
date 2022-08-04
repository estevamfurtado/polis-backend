import parser from '../../src/utils/parsers/index.js';
import { Prisma } from '@prisma/client';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const paths = {
    deputadosSeed: path.resolve(__dirname, './data.files/json/deputados_seed.json')
}

const deputados = parser.json.read(paths.deputadosSeed) as {
    date: string,
    data: Prisma.PersonCreateInput[]
};

export default deputados;
