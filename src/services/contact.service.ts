import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';

type Element = Prisma.Contact;
type CreateInput = Prisma.Prisma.ContactCreateInput;
type UpdateInput = Prisma.Prisma.ContactUpdateInput;

const repo = repos.contact;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`Contact with id ${id} does not exist`);
    }
    return result;
}

export default { validateOrCrash };