import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';
import variables from './variables.js';

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
}

async function getLastRanking () {
    const result = await repo.getByYear(variables.LAST_YEAR);
    return result;
}

async function getLastCompleteRanking () {
    const result = await repo.getLastCompleteRanking(variables.LAST_YEAR);
    return result;
}

export default { validateOrCrash, validateOrCrashByYear ,createMany, getLastRanking, getLastCompleteRanking};