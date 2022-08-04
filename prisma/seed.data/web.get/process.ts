import parsers from '../../../src/utils/parsers/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const paths = {
    parties: {
        from: path.resolve(__dirname, '../data.files/csv/politicalParties.csv'),
        to: path.resolve(__dirname, '../data.files/json/parties_seed.json') 
    },
    states: {
        from: path.resolve(__dirname, '../data.files/csv/states.csv'),
        to: path.resolve(__dirname, '../data.files/json/states_seed.json')
    }
}


function transformCsvsToJson(paths: any) {
    const data = parsers.csv.read(paths.from);
    parsers.json.write(data, paths.to);
    const dados = parsers.json.read(paths.to);
}

// transformCsvsToJson(paths.parties);