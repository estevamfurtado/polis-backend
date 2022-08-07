import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';

type Element = Prisma.Ranking;
type CreateInput = Prisma.Prisma.RankingCreateInput;
type UpdateInput = Prisma.Prisma.RankingUpdateInput;

const repo = repos.ranking;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`Ranking with id ${id} does not exist`);
    }
    return result;
}

async function validateOrCrashByYear (year: number) : Promise<Element> {
    const result = await repo.getByYear(year);
    if (!result) {
        throw AppError.notFound(`Ranking for year ${year} does not exist`);
    }
    return result;
}

async function createMany (input: CreateInput[]) {

    await repo.createMany(input);
    const parties = await repos.party.getAll();
    const rankings = await repo.getAllWithPartyRecords();
    
    const scoreTypes: Prisma.Prisma.PartyScoreUncheckedCreateWithoutPartyRecordInput[] = [
        {type: 'scorePresence'},
        {type: 'scoreSaveQuota'},
        {type: 'scoreProcess'},
        {type: 'scoreInternal'},
        {type: 'scorePrivileges'},
        {type: 'scoreWastage'},
        {type: 'scoreTotal'}
    ] 

    for (const ranking of rankings) {
        if (ranking.partyRecords.length === 0) {
            for (const party of parties) {
                await repos.partyRecord.create({
                    party: {connect: {abbreviation: party.abbreviation}},
                    ranking: {connect: {year: ranking.year}},
                    scores: {create: scoreTypes}
                });
            }
        }
    }

}

async function getLastRanking () {
    const result = await repo.getByYear(2022);
    return result;
}

export default { validateOrCrash, validateOrCrashByYear ,createMany, getLastRanking};