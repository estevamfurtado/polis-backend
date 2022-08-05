import pkg from '@prisma/client';
import database from "../database.js";


const db = database.prisma.albumPage;

export type CreateInput = pkg.Prisma.AlbumPageCreateInput
export type UpdateInput = pkg.Prisma.AlbumPageUpdateInput



async function create (albumPage: CreateInput) {
    return await db.create({data: albumPage});
}

async function get (id: number) {
    return await db.findFirst({where: {id}});
}

async function update (id: number, albumPage: UpdateInput) {
    return await db.update({where: {id}, data: albumPage});
}


export default {
    create,
    get,
    update,
}