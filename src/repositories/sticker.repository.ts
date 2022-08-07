import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.sticker;

export type CreateInput = pkg.Prisma.StickerCreateInput
export type UpdateInput = pkg.Prisma.StickerUpdateInput



async function create (sticker: CreateInput) {
    return await db.create({data: sticker});
}

async function get (id: number) {
    return await db.findFirst({where: {id}});
}

async function update (id: number, sticker: UpdateInput) {
    return await db.update({where: {id}, data: sticker});
}

async function getAllByAlbumId (albumId: number) {
    return await db.findMany({
        where: {
            page: {album: {id: albumId}}
        },
        include: {
            page: {select: {id: true}},
            entryInPage: {select: {id: true}}
        }
});
}

export default {
    create,
    get,
    update,
    getAllByAlbumId
}