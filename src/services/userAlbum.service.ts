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

async function getByAlbumAndPerson (albumId: number, personId: number) {
    const result = await repo.getByAlbumAndPerson(albumId, personId);
    return result;
}

async function connectToCard (albumId: number, cardId: number) {
    return await repo.connectToCard(albumId, cardId);
}

export default { validateOrCrash, getByAlbumAndPerson, connectToCard };