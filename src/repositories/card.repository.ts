import pkg from '@prisma/client';
import database from "../database.js";
import loggerUtils from '../utils/logger.utils.js';

const db = database.prisma.card;

export type CreateInput = pkg.Prisma.CardCreateInput
export type UpdateInput = pkg.Prisma.CardUpdateInput



async function create (card: CreateInput) {
    return await db.create({data: card});
}

async function get (id: number) {
    loggerUtils.log('repository', 'Get card by id');
    return await db.findFirst({where: {id}}) || null;
}

async function update (id: number, card: UpdateInput) {
    return await db.update({where: {id}, data: card});
}

async function getWithAlbum (id: number) {
    return await db.findFirst({where: {id}, include: {
        model: {
            include: {
                stickers: {
                    include: {
                        page: {
                            include: {
                                album: {},
                            }
                        }
                    }
                },
            }
        }
    }});
}

async function getPastedByOwnerIdModelId (ownerId: number, modelId: number) {
    return await db.findMany({where: {ownerId, modelId, isPasted: true}});
}


async function getAllByOwner (ownerId: number) {
    return await db.findMany({where: {ownerId}});
}

async function getAllByOwnerWithDetails (ownerId: number) {
    return await db.findMany({
        where: {ownerId},
        include: {
            model: {
                include: {
                    record: {
                        include: {
                            politician: true
                        }
                    },
                }
            }
        }
    });
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