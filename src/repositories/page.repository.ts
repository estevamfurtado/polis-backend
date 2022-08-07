import pkg from '@prisma/client';
import database from "../database.js";


const db = database.prisma.page;

export type CreateInput = pkg.Prisma.PageCreateInput
export type UpdateInput = pkg.Prisma.PageUpdateInput



async function create (page: CreateInput) {
    return await db.create({data: page});
}

async function get (id: number) {
    return await db.findFirst({where: {id}});
}

async function update (id: number, page: UpdateInput) {
    return await db.update({where: {id}, data: page});
}

async function getPagesWithStickersIds (albumId: number) {
    return await db.findMany({
        where: {album: {id: albumId}},
        include: {
            stickers: {select: {id: true}},
            album: {select: {id: true}},
            entryInAlbum: {select: {id: true}}
        }
    });
}


export default {
    create,
    get,
    update,
    getPagesWithStickersIds
}