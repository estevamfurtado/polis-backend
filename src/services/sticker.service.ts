import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';

type Element = Prisma.Sticker;
type CreateInput = Prisma.Prisma.StickerCreateInput;
type UpdateInput = Prisma.Prisma.StickerUpdateInput;

const repo = repos.sticker;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`Sticker with id ${id} does not exist`);
    }
    return result;
}

export default { validateOrCrash };