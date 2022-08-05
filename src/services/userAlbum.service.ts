import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';

type Element = Prisma.UserAlbum;
type CreateInput = Prisma.Prisma.UserAlbumCreateInput;
type UpdateInput = Prisma.Prisma.UserAlbumUpdateInput;

const repo = repos.userAlbum;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`UserAlbum with id ${id} does not exist`);
    }
    return result;
}

export default { validateOrCrash };