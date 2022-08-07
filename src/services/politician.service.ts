import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';

type Element = Prisma.Politician;
type CreateInput = Prisma.Prisma.PoliticianCreateInput;
type UpdateInput = Prisma.Prisma.PoliticianUpdateInput;

const repo = repos.politician;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`Politician with id ${id} does not exist`);
    }
    return result;
}

async function getAll () {
    return repo.getAll();
}

export default { 
    validateOrCrash,
    getAll
};