import pkg, { StickerAvailabilityTypes } from '@prisma/client';
import database from "../database.js";
import errorUtils from '../utils/errors/error.utils.js';
import loggerUtils from '../utils/logger.utils.js';

const db = database.prisma.sticker;

export type CreateInput = pkg.Prisma.StickerCreateInput
export type UpdateInput = pkg.Prisma.StickerUpdateInput



async function create (sticker: CreateInput) {
    try {
        return await db.create({data: sticker});
    } catch (error) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function get (id: number) {
    try {
        return await db.findFirst({where: {id}});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong id');
    }
}

async function update (id: number, sticker: UpdateInput) {
    try {
        return await db.update({where: {id}, data: sticker});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function getAllByAlbumId (albumId: number) {
    try {
        return await db.findMany({
            where: {
                page: {album: {id: albumId}}
            },
            include: {
                page: {select: {id: true}},
            }
        });
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function getAllByYearAndAvailability(year: number, availability: StickerAvailabilityTypes) {
    try {
        return await db.findMany({
            where: {
                page: {album: {year: year}},
                availability: availability,
            },
            include: {
                page: {select: {id: true}},
            }
        });
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function getAllByYear (year: number) {
    try {
        return await db.findMany({
            where: {
                page: {album: {year: year}},
            },
            include: {
                page: {select: {id: true}},
            }
        });
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

export default {
    create,
    get,
    update,
    getAllByAlbumId,
    getAllByYearAndAvailability,
    getAllByYear
}