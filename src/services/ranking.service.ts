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

export default { validateOrCrash };