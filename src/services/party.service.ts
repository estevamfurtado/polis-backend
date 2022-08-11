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

async function getAll () {
    return repo.getAll();
}

async function createMany (states: CreateInput[]) {
    return repo.createMany(states);
}

export default { 
    validateOrCrash,
    getAll,
    createMany
};