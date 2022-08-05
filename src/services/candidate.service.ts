import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';

type Element = Prisma.Candidate;
type CreateInput = Prisma.Prisma.CandidateCreateInput;
type UpdateInput = Prisma.Prisma.CandidateUpdateInput;

const repo = repos.candidate;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`Candidate with id ${id} does not exist`);
    }
    return result;
}

export default { validateOrCrash };