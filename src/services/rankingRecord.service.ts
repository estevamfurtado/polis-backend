import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';

type Element = Prisma.RankingRecord;
type CreateInput = Prisma.Prisma.RankingRecordCreateInput;
type UpdateInput = Prisma.Prisma.RankingRecordUpdateInput;

const repo = repos.rankingRecord;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`RankingRecord with id ${id} does not exist`);
    }
    return result;
}

export default { validateOrCrash };