import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';

type Element = Prisma.PartyRecord;
type CreateInput = Prisma.Prisma.PartyRecordCreateInput;
type UpdateInput = Prisma.Prisma.PartyRecordUpdateInput;

const repo = repos.partyRecord;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`Record with id ${id} does not exist`);
    }
    return result;
}

async function createManyEach (records: CreateInput[]) {
    for (const record of records) {
        await repo.create(record);
    }
}


type PartyRecordWithRecordsAndScores = Prisma.PartyRecord & {
    records: Prisma.Record[];
    scores: Prisma.PartyScore[];
};

async function updateAllScores () {
    const partyRecords = await repo.getAllWithRecordsAndScores();
    for (const partyRecord of partyRecords) {
        await updateScores(partyRecord);
    }
}

async function updateScores (partyRecord: PartyRecordWithRecordsAndScores) {

    const newScores = [];

    for(const score of partyRecord.scores) {
        const newScore = {
            totalScore: 0.0,
            count: 0,
            average: 0.0
        }

        const type = score.type as keyof Prisma.Prisma.PartyScoreUncheckedCreateWithoutPartyRecordInput;
        for(const record of partyRecord.records) {
            if (record[type]) {
                newScore.totalScore += record[type];
                newScore.count++;
            }
        }
        newScore.average = newScore.totalScore / newScore.count;

        newScores.push({
            data: newScore,
            where: {
                id: score.id
            },
        });
    }
    await repo.updateScores(partyRecord.id, newScores);

}

async function getOrderedByTotalScores (year: number) {
    const partyRecords = await repo.getAllWithRecordsAndScores(year);

    const orderedPartyRecords = partyRecords.sort((a, b) => {
        const a_totalScore = a.scores.find(score => score.type === 'scoreTotal').average;
        const b_totalScore = b.scores.find(score => score.type === 'scoreTotal').average;
        return b_totalScore - a_totalScore;
    }).filter(partyRecord => partyRecord.rankingYear === year);

    return orderedPartyRecords;
}

async function getByRanking (rankingId: number) {
    return await repo.getByRanking(rankingId);
}


export default { validateOrCrash, createManyEach, updateScores, updateAllScores, getOrderedByTotalScores, getByRanking };