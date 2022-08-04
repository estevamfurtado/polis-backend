import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const json = {
    errors: {
        seedDeputados: path.resolve(__dirname, './json/errors/seed_deputados.json'),
        seedRecords: path.resolve(__dirname, './json/errors/seed_records.json'),
    },
    raw: {
        deputados: path.resolve(__dirname, './json/raw/deputados.json'),
        rankings: path.resolve(__dirname, './json/raw/ranking.json'),
    },
    seed: {
        deputados: path.resolve(__dirname, './json/seed/deputados.json'),
        rankings: path.resolve(__dirname, './json/seed/rankings.json'),
        states: path.resolve(__dirname, './json/seed/states.json'),
        parties: path.resolve(__dirname, './json/seed/parties.json'),
        rankingRecords: path.resolve(__dirname, './json/seed/records.json'),
    }
}
const csv = {
    errors: {},
    raw: {
        parties: path.resolve(__dirname, './csv/raw/parties.csv'),
        states: path.resolve(__dirname, './csv/raw/states.csv'),
    },
    seed: {}
}

export default { csv, json };