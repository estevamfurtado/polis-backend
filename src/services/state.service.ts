import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';

type Element = Prisma.State;
type CreateInput = Prisma.Prisma.StateCreateInput;
type UpdateInput = Prisma.Prisma.StateUpdateInput;

const repo = repos.state;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get.vanilla.whereId(id);
    if (!result) {
        throw AppError.notFound(`State with id ${id} does not exist`);
    }
    return result;
}

async function validateAbbreviationOrCrash (abbreviation: string) : Promise<Element> {
    const result = await repo.get.vanilla.whereAbbreviation(abbreviation);
    if (!result) {
        throw AppError.notFound(`State with abbreviation ${abbreviation} does not exist`);
    }
    return result;
}


export default { 
    validate: {
        byId: {
            orCrash: validateOrCrash
        },
        byAbbreviation: {
            orCrash: validateAbbreviationOrCrash
        }
    }
};