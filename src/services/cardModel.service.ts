import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';

type Element = Prisma.CardModel;
type CreateInput = Prisma.Prisma.CardModelCreateInput;
type UpdateInput = Prisma.Prisma.CardModelUpdateInput;

const repo = repos.cardModel;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`CardModel with id ${id} does not exist`);
    }
    return result;
}

async function createByRankingRecord (record: any) {
    const cardModel = await repo.create({
        imageUrl: record.politician.imageUrl,
        record: {connect: {id: record.id}},
    });
    return cardModel;
}

async function getByRanking (rankingId: number) {
    const result = await repo.getByRanking(rankingId);
    return result;
}

export default { validateOrCrash, createByRankingRecord, getByRanking };