import pkg from '@prisma/client';
import database from "../database.js";
import errorUtils from '../utils/errors/error.utils.js';
import loggerUtils from '../utils/logger.utils.js';

const db = database.prisma.card;

export type CreateInput = pkg.Prisma.CardCreateInput
export type UpdateInput = pkg.Prisma.CardUpdateInput



async function create (card: CreateInput) {
    try {
        return await db.create({data: card});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong card schema');
    }
}

async function get (id: number) {
    try {
        loggerUtils.log('repository', 'Get card by id');
        return await db.findFirst({where: {id}}) || null;
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong id');
    }
}

async function update (id: number, card: UpdateInput) {
    try {
        return await db.update({where: {id}, data: card});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function getWithAlbum (id: number) {
    try {
        return await db.findFirst({where: {id}, include: {
            sticker: {
                include: {
                    page: {
                        include: {
                            album: true
                        }
                    }
                }
            }
        }});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong id');
    }
}

async function getPastedByOwnerIdModelId (ownerId: number, stickerId: number) {
    try {
        return await db.findMany({where: {ownerId, stickerId, isPasted: true}});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong id');
    }
}


async function getAllByOwner (ownerId: number) {
    try {
        return await db.findMany({where: {ownerId}});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong id');
    }
}

async function getAllByOwnerWithDetails (ownerId: number) {
    try {
        return await db.findMany({
            where: {ownerId},
            include: {
                sticker: {
                    include: {
                        politicianRecord: {
                            include: {
                                politician: true
                            }
                        },
                    }
                }
            }
        });
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong id');
    }
}

export default {
    create,
    get,
    update,
    getWithAlbum,
    getAllByOwner,
    getAllByOwnerWithDetails,
    getPastedByOwnerIdModelId,
}