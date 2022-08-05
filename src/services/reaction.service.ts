import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';

type Element = Prisma.Reaction;
type CreateInput = Prisma.Prisma.ReactionCreateInput;
type UpdateInput = Prisma.Prisma.ReactionUpdateInput;

const repo = repos.reaction;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`Reaction with id ${id} does not exist`);
    }
    return result;
}

export default { validateOrCrash };