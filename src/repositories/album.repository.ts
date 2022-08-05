import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.album;

export type CreateInput = pkg.Prisma.AlbumCreateInput
export type UpdateInput = pkg.Prisma.AlbumUpdateInput



async function create (album: CreateInput) {
    return db.create({data: album});
}

async function get (id: number) {
    return db.findFirst({where: {id}});
}

async function update (id: number, album: UpdateInput) {
    return db.update({where: {id}, data: album});
}

export default {
    create,
    get,
    update
}