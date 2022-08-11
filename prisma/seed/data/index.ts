import parser from '../../../src/utils/parsers/index.js';
import { Prisma } from '@prisma/client';
import paths from '../files/paths.js'
import { DeputadoPerson } from '../files/types.js';

function generateDeputados() : Prisma.PersonCreateInput[] {
    const data = parser.json.read(paths.json.seed.deputados) as { data: DeputadoPerson[] };
    const deputados : Prisma.PersonCreateInput[] = data.data.map(d => {
        const r = {...d, politician: {...d.politicianProfile}};
        delete r.contact;
        delete r.politicianProfile;
        return r;
    });
    return deputados;
}
function generateRecords() {
    const data = parser.json.read(paths.json.seed.records);

    console.log(data.data.length);

    const records = data.data.map(r => {
        const t = {...r};
        const party = r.party.connect.abbreviation;
        const translate = {'PODEMOS': 'PODE'};
        const newParty = translate[party] || party;
        t.party.connect.abbreviation = newParty;
        t.partyRecord.connect.rankingYear_partyAbbreviation.partyAbbreviation = newParty;
        return t;
    });

    return records;
}

export default {
    deputados: generateDeputados(),
    parties: parser.json.read(paths.json.seed.parties).data as Prisma.PartyCreateInput[],
    rankings: parser.json.read(paths.json.seed.rankings).data as Prisma.RankingCreateInput[],
    states: parser.json.read(paths.json.seed.states).data as Prisma.StateCreateInput[],
    records: generateRecords() as Prisma.RecordCreateInput[],
};