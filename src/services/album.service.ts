import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';

type Element = Prisma.Album;
type CreateInput = Prisma.Prisma.AlbumCreateInput;
type UpdateInput = Prisma.Prisma.AlbumUpdateInput;

const repo = repos.album;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`Album with id ${id} does not exist`);
    }
    return result;
}

export default { validateOrCrash };