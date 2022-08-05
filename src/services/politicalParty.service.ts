import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';

type Element = Prisma.PoliticalParty;
type CreateInput = Prisma.Prisma.PoliticalPartyCreateInput;
type UpdateInput = Prisma.Prisma.PoliticalPartyUpdateInput;

const repo = repos.politicalParty;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`PoliticalParty with id ${id} does not exist`);
    }
    return result;
}

export default { validateOrCrash };