import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';

type Element = Prisma.Card;
type CreateInput = Prisma.Prisma.CardCreateInput;
type UpdateInput = Prisma.Prisma.CardUpdateInput;

const repo = repos.card;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`Card with id ${id} does not exist`);
    }
    return result;
}

export default { validateOrCrash };