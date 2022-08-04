import parsers from '../../../src/utils/parsers/index.js';
import paths from '../files/index.js';

const fromTo = {
    parties: {
        from: paths.csv.raw.parties,
        to: paths.json.seed.parties
    },
    states: {
        from: paths.csv.raw.states,
        to: paths.json.seed.states
    }
}


function transformCsvsToJson(paths: any) {
    const data = parsers.csv.read(paths.from);
    parsers.json.write(data, paths.to);
    const dados = parsers.json.read(paths.to);
}

// transformCsvsToJson(fromTo);