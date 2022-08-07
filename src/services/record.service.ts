import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';

type Element = Prisma.Record;
type CreateInput = Prisma.Prisma.RecordCreateInput;
type UpdateInput = Prisma.Prisma.RecordUpdateInput;

const repo = repos.record;

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

async function getByRanking (rankingId: number) {
    return await repo.getByRanking(rankingId);
}

export default { validateOrCrash, createManyEach, getByRanking };