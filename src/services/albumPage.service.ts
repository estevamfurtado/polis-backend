import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';

type Element = Prisma.AlbumPage;
type CreateInput = Prisma.Prisma.AlbumPageCreateInput;
type UpdateInput = Prisma.Prisma.AlbumPageUpdateInput;

const repo = repos.albumPage;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`AlbumPage with id ${id} does not exist`);
    }
    return result;
}

export default { validateOrCrash };