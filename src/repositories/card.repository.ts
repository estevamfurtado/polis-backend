import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.card;

export type CreateInput = pkg.Prisma.CardCreateInput
export type UpdateInput = pkg.Prisma.CardUpdateInput



async function create (card: CreateInput) {
    return await db.create({data: card});
}

async function get (id: number) {
    return await db.findFirst({where: {id}});
}

async function update (id: number, card: UpdateInput) {
    return await db.update({where: {id}, data: card});
}

async function getWithAlbum (id: number) {
    return await db.findFirst({where: {id}, include: {
        model: {
            include: {
                Sticker: {
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

async function getAllByOwner (ownerId: number) {
    return await db.findMany({where: {ownerId}});
}

export default {
    create,
    get,
    update,
    getWithAlbum,
    getAllByOwner
}