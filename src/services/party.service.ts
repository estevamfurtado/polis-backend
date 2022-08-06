import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';

type Element = Prisma.Party;
type CreateInput = Prisma.Prisma.PartyCreateInput;
type UpdateInput = Prisma.Prisma.PartyUpdateInput;

const repo = repos.party;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`PoliticalParty with id ${id} does not exist`);
    }
    return result;
}

async function getOrderedByRanking (rankingId: number) {
    const parties = await repo.getByRankingIdWithRecordsWithPoliticians(rankingId);
    const partiesWithScores = parties
        .filter(party => party.records.length > 0)
        .map(party => {
            return evaluatePartyWithRankingRecordsWithPoliticians(party);
        })

    const sortedParties = partiesWithScores.sort((a, b) => b.scoreTotal.avg - a.scoreTotal.avg);
    const sortedPartiesWithRankingRecords = sortedParties.map(party => {
        party.records = party.records.sort((a, b) => b.scoreTotal - a.scoreTotal);
        return party;
    })
    return sortedPartiesWithRankingRecords;
}

type PartyWithRecordsWithPoliticians = (Prisma.Party & {
    records: (Prisma.Record & {
        politician: Prisma.Politician
    })[];
});

function evaluatePartyWithRankingRecordsWithPoliticians (party: PartyWithRecordsWithPoliticians) {
    
    const partyScores = {
        scoreTotal: {total: 0, count: 0, avg: 0},
        scoreInternal: {total: 0, count: 0, avg: 0},
        scorePresence: {total: 0, count: 0, avg: 0},
        scorePrivileges: {total: 0, count: 0, avg: 0},
        scoreProcess: {total: 0, count: 0, avg: 0},
        scoreWastage: {total: 0, count: 0, avg: 0},
        scoreSaveQuota: {total: 0, count: 0, avg: 0},
    }

    party.records.forEach(record => {
        const {scoreTotal, scoreInternal, scorePresence, scorePrivileges, scoreProcess, scoreWastage, scoreSaveQuota} = record;
        partyScores.scoreInternal = calculateNewScore(partyScores.scoreInternal, scoreInternal);
        partyScores.scorePresence = calculateNewScore(partyScores.scorePresence, scorePresence);
        partyScores.scorePrivileges = calculateNewScore(partyScores.scorePrivileges, scorePrivileges);
        partyScores.scoreProcess = calculateNewScore(partyScores.scoreProcess, scoreProcess);
        partyScores.scoreWastage = calculateNewScore(partyScores.scoreWastage, scoreWastage);
        partyScores.scoreSaveQuota = calculateNewScore(partyScores.scoreSaveQuota, scoreSaveQuota);
        partyScores.scoreTotal = calculateNewScore(partyScores.scoreTotal, scoreTotal);
    })

    return {
        ...party,
        ...partyScores,
    }
}

function calculateNewScore (initial: {total: number, count: number, avg: number}, value?: number) {
    if (value) {
        return {
            total: initial.total + value,
            count: initial.count + 1,
            avg: initial.total + value / initial.count,
        }
    }
    return initial;
}

export default { validateOrCrash, getOrderedByRanking };