import { Prisma } from "@prisma/client";

import * as depData from "./deputados.js";
import * as partiesData from "./parties.js";
import * as rankingData from "./rankings.js";
import * as recordsData from "./records.js";
import * as statesData from "./states.js";

function generateDeputados(): Prisma.PersonCreateInput[] {
    const data = depData.deputados.data;
    const deputados: Prisma.PersonCreateInput[] = data.map((d) => {
        const r = { ...d, politician: { ...d.politicianProfile } };
        delete r.contact;
        delete r.politicianProfile;
        return r;
    });
    return deputados;
}

function generateRecords() {
    const data = recordsData.records.data;
    const records = data.map((r) => {
        const t = { ...r };
        const party = r.party.connect.abbreviation;
        const translate = { PODEMOS: "PODE" };
        const newParty = translate[party] || party;
        t.party.connect.abbreviation = newParty;
        t.partyRecord.connect.rankingYear_partyAbbreviation.partyAbbreviation = newParty;
        return t;
    });

    return records;
}

export default {
    deputados: generateDeputados(),
    records: generateRecords() as Prisma.RecordCreateInput[],
    parties: partiesData.parties.data,
    rankings: rankingData.rankings.data,
    states: statesData.states.data,
};
