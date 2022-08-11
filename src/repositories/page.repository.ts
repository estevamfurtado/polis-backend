import pkg from '@prisma/client';
import database from "../database.js";
import errorUtils from '../utils/errors/error.utils.js';


const db = database.prisma.page;

export type CreateInput = pkg.Prisma.PageCreateInput
export type UpdateInput = pkg.Prisma.PageUpdateInput



async function create (page: CreateInput) {
    try {
        return await db.create({data: page});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong page schema');
    }
}

async function get (id: number) {
    try {
        return await db.findFirst({where: {id}});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong id');
    }
}

async function update (id: number, page: UpdateInput) {
    try {
        return await db.update({where: {id}, data: page});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function getPagesWithStickersIds (albumId: number) {
    try {
        return await db.findMany({
            where: {album: {id: albumId}},
            orderBy: {
                orderInAlbum: 'asc'
            },
            include: {
                stickers: {
                    select: {id: true}, 
                    orderBy: {
                        orderInPage: 'asc'
                    }
                },
                album: {select: {id: true}},
            },
        });
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong id');
    }
}


export default {
    create,
    get,
    update,
    getPagesWithStickersIds
}