import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';

type Element = Prisma.CandidateShortVideo;
type CreateInput = Prisma.Prisma.CandidateShortVideoCreateInput;
type UpdateInput = Prisma.Prisma.CandidateShortVideoUpdateInput;

const repo = repos.candidateShortVideo;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`CandidateShortVideo with id ${id} does not exist`);
    }
    return result;
}

export default { validateOrCrash };