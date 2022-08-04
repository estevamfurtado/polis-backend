import parsers from '../../../src/utils/parsers/index.js';
import axios from 'axios';
import Prisma from '@prisma/client';

import paths from '../files/paths.js';

async function saveDeputadosData() {
    const deputados = await getDeputadosFromAPI();
    parsers.json.write(deputados, paths.json.raw.rankings);
}

async function getDeputadosFromAPI() {
    let url = "https://apirest.politicos.org.br/api/parliamentarianranking?Year=0&Position=&Skip=&Take=500&OrderBy=scoreRanking&Nickname=&StatusId=1&Include=Parliamentarian.State,Parliamentarian.Party,Parliamentarian.Organ,Parliamentarian.Page"
    let response = await axios.get(url);
    return response.data.data as RawDeputadoFromRankingDosPoliticos[];
}

async function readRanking() {
    console.log('Reading ranking data...');
    const data = parsers.json.read(paths.json.raw.rankings) as {
        date: string,
        data: RawDeputadoFromRankingDosPoliticos[]
    };
    const deputados = data.data;

    console.log('Getting politicians from db...');
    const politiciansInDb = await getPoliticiansWithCPFFromDatabase();

    console.log('Processing ranking data...');
    const records = processRanking(deputados, politiciansInDb);

    console.log('Saving ranking seed data...');
    parsers.json.write(records, paths.json.seed.rankingRecords);

    console.log('Seed data saved!');
}

async function getPoliticiansWithCPFFromDatabase() {
    const db = new Prisma.PrismaClient();
    const politicians = await db.politician.findMany({include: {person: {select: {cpf: true}}}});
    return politicians;
}

function processRanking(politicians: RawDeputadoFromRankingDosPoliticos[], politiciansInDb: (Prisma.Politician & {person: {cpf: string}})[]) : Prisma.Prisma.PoliticianInRankingCreateInput[] {
    
    console.log(`# deputados: ${politicians.length}`)
    console.log(`# politicians in db: ${politiciansInDb.length}`)

    const records = [];

    let cpfs = 0;
    let cpfsFound = 0;
    let allRecords = 0;
    let recordsSaved = 0;

    const cpfHt = {};
    const idHt = {};

    politicians.forEach(p => {

        const searchCPF = p.parliamentarian?.cpf?.replace(/[^0-9]/g, '') || null; 
        allRecords += p.parliamentarian.ranking.length;

        if (searchCPF && !cpfHt[searchCPF]) {
            
            cpfHt[searchCPF] = true;
            cpfs++;

            const politicianInDb = politiciansInDb.find(pol => pol.person.cpf === searchCPF) || null;
            const politicianId = politicianInDb?.id || null;

            if (politicianId && !idHt[politicianId]) {

                idHt[politicianId] = true;

                cpfsFound++;
                const politician = {connect: {id: politicianId}};
                console.log(`${cpfsFound} - ${politicianId}`);

                const politicianData = createPoliticianData(p);

                p.parliamentarian.ranking.forEach(r => {
                    if (r.year > 0) {
                        const recordData = createRecordData(r);
                        const record = {
                            politician,
                            ...politicianData,
                            ...recordData
                        } as Prisma.Prisma.PoliticianInRankingCreateInput;
        
                        records.push(record);
                        recordsSaved++;
                    }
                })
            }
        }
        
    })

    console.log(`# cpfs: ${cpfs}`)
    console.log(`# cpfs found: ${cpfsFound}`)
    console.log(`# all records: ${allRecords}`)
    console.log(`# records saved: ${recordsSaved}`)

    return records;
}

function createPoliticianData(p: any) {

    const source = {
        sourceId: `${p.parliamentarian.id}`,
        sourceUrl: `https://www.politicos.org.br/Parlamentar/${p.parliamentarian.id}`,
        sourceName: 'Ranking dos Políticos'
    }
    
    const party = {connect: {abbreviation: p.parliamentarian.party.prefix}} as Prisma.Prisma.PoliticalPartyCreateNestedOneWithoutRankingRecordsInput;
    const state = {connect: {abbreviation: p.parliamentarian.state.prefix}} as Prisma.Prisma.StateCreateNestedOneWithoutRankingRecordInput;
    const info = {
        party,
        state,
        candidateType: p.parliamentarian.position,
        quantityVote: Number(String(p.parliamentarian.quantityVote).replace(/[^0-9]/g, '')),
        quotaAmountSum: p.parliamentarian.quotaAmountSum,
    }

    const booleans = {
        reelected: p.parliamentarian.reelected,
        cutAidShift: p.parliamentarian.cutAidShift,
        isPresident: p.parliamentarian.isPresident,
        cutHousingAllowance: p.parliamentarian.cutHousingAllowance,
        cutRetirement: p.parliamentarian.cutRetirement,
        requestedFamilyPassport: p.parliamentarian.requestedFamilyPassport,
    }

    return {
        ...source,
        ...info,
        ...booleans,
    }
}

function createRecordData (r: any) {
    const ranking = {connect: {year_title: {year: r.year, title: 'Ranking dos Políticos'}}} as Prisma.Prisma.RankingCreateNestedOneWithoutRecordsInput;

    const scores = {
        scorePresence: r.scorePresence,
        scoreSaveQuota: r.scoreSaveQuota,
        scoreProcess: r.scoreProcess,
        scoreInternal: r.scoreInternal,
        scorePrivileges: r.scorePrivileges,
        scoreWastage: r.scoreWastage,
        scoreTotal: r.scoreTotal,
        scoreRanking: r.scoreRanking,
        scoreRankingByPosition: r.scoreRankingByPosition,
        scoreRankingByParty: r.scoreRankingByParty,
        scoreRankingByState: r.scoreRankingByState,
    }

    const formulas = {
        scorePresenceFormula: r.scorePresenceFormula,
        scoreProcessFormula: r.scoreProcessFormula,
        scorePrivilegesFormula: r.scorePrivilegesFormula,
        scoreSaveQuotaFormula: r.scoreSaveQuotaFormula,
        scoreWastageFormula: r.scoreWastageFormula,
        scoreTotalFormula: r.scoreTotalFormula,
    }

    const counters = {
        parliamentarianCount: r.parliamentarianCount,
        parliamentarianStateCount: r.parliamentarianStateCount,
        parliamentarianStaffMaxYear: r.parliamentarianStaffMaxYear,
        parliamentarianQuotaMaxYear: r.parliamentarianQuotaMaxYear,
    }

    return {
        ranking,
        ...scores,
        ...formulas,
        ...counters,
    }
}


readRanking();


interface RawDeputadoFromRankingDosPoliticos {
    "id": number
    "parliamentarianId": number
    "parliamentarian": {
        "id": number
        "status": null,
        "statusId": number
        "state": {
            "id": number | null
            "name": string
            "prefix": string
            "photo": string
        },
        "organ": {
            "id": number | null
            "name": string | null
        },
        "party": {
            "id": number | null
            "name": string | null
            "prefix": string | null
            "photo": string | null
            "active": boolean | null
            "possiblePrefixes": string | null
        },
        "parliamentarianType": string | null
        "name": string | null
        "nickname": string | null
        "cpf": string | null
        "photo": string | null
        "email": string | null
        "position": string | null
        "partyElect": string | null
        "previousPosition": string | null
        "partyAffiliation": string | null
        "relevantPositions": number | string | null
        "otherInformations": string | null
        "profession": number | string | null
        "academic": number | string | null
        "dateBirth": number | string | null
        "pollType": number | string | null
        "quantityVote": number | string | null
        "reelected": boolean | null
        "candidateType": number | string | null
        "candidateNumber": number | string | null
        "code": number | string | null
        "enrolment": number | string | null
        "register": string | null
        "startExercise": string | null
        "endExercise": string | null
        "phone": string | null
        "instagram": string | null
        "twitter": string | null
        "facebook": string | null
        "youtube": string | null
        "cutAidShift": boolean | null,
        "isPresident": boolean | null,
        "cutHousingAllowance": boolean | null,
        "cutRetirement": boolean | null,
        "requestedFamilyPassport": boolean | null,
        "totalPassportFamilyMembers": number | null,
        "daysInExercise": number | null,
        "quotaAmountSum": number | null,
        "page": number | null,
        "stateId": number | null,
        "organId": number | null,
        "partyId": number
        "typeId": number | null,
        "pollTypeId": number | null,
        "candidateTypeId": number | null,
        "lawVotes": any[],
        "lawAuthor": any[],
        "lawReviser": any[],
        "quotas": any[],
        "internalScores": any[],
        "processes": any[],
        "ratings": any[],
        "comments": any[],
        "commissions": any[],
        "assiduityCommissions": any[],
        "assiduityPlenaries": any[],
        "legislativeMatters": any[],
        "newsPapers": any[],
        "privileges": any[],
        "ranking": RankingRecord[]
        "rankingWinners": any[],
        "staffs": any[],
        "ballinBallouts": any[]
    },
    "year": number
    "scorePresence": number
    "scoreSaveQuota": number
    "scoreSaveQuotaPercentage": number
    "scoreProcess": number
    "scoreInternal": number
    "scorePrivileges": number
    "scoreWastage": number
    "scoreTotal": number
    "scoreRanking": number
    "scoreRankingByPosition": number
    "scoreRankingByParty": number
    "scoreRankingByState": number
    "scorePresenceFormula": string
    "scoreProcessFormula": string
    "scorePrivilegesFormula": string
    "scoreSaveQuotaFormula": string
    "scoreWastageFormula": string
    "scoreTotalFormula": string
    "parliamentarianCount": number
    "parliamentarianStateCount": number
    "parliamentarianStaffMaxYear": number
    "parliamentarianStaffAmountUsed": number
    "parliamentarianQuotaMaxYear": number
    "parliamentarianQuotaTotal": number
    "active": boolean
}

interface RankingRecord {
    "id": number
    "parliamentarian": null
    "parliamentarianId": number
    "year": number
    "scorePresence": number
    "scoreSaveQuota": number
    "scoreProcess": number
    "scoreInternal": number
    "scorePrivileges": number
    "scoreWastage": number
    "scoreTotal": number
    "scoreRanking": number
    "scoreRankingByPosition": number
    "scoreRankingByParty": number
    "scoreRankingByState": number
    "scorePresenceFormula": string
    "scoreProcessFormula": string
    "scorePrivilegesFormula": string
    "scoreSaveQuotaFormula": string
    "scoreWastageFormula": string
    "scoreTotalFormula": string
    "parliamentarianCount": number
    "parliamentarianStateCount": number
    "parliamentarianStaffMaxYear": number
    "parliamentarianQuotaMaxYear": number
}