import parsers from '../../../src/utils/parsers/index.js';
import axios from 'axios';

import { Prisma } from '@prisma/client';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const paths = {
    rankingRaw: path.resolve(__dirname, '../data.files/json/ranking_raw.json'),
}


async function saveDeputadosData() {
    const deputados = await getDeputadosFromAPI();
    parsers.json.write(deputados, paths.rankingRaw);
}

async function getDeputadosFromAPI() {
    let url = "https://apirest.politicos.org.br/api/parliamentarianranking?Year=0&Position=&Skip=&Take=500&OrderBy=scoreRanking&Nickname=&StatusId=1&Include=Parliamentarian.State,Parliamentarian.Party,Parliamentarian.Organ,Parliamentarian.Page"
    let response = await axios.get(url);
    return response.data.data as RawDeputadoFromRankingDosPoliticos[];
}

function saveRankings() {}



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