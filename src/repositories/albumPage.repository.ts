import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.albumPage;

export type CreateInput = pkg.Prisma.AlbumPageCreateInput
export type UpdateInput = pkg.Prisma.AlbumPageUpdateInput



async function create (albumPage: CreateInput) {
    return db.create({data: albumPage});
}

async function get (id: number) {
    return db.findFirst({where: {id}});
}

async function update (id: number, albumPage: UpdateInput) {
    return db.update({where: {id}, data: albumPage});
}

export default {
    create,
    get,
    update
}