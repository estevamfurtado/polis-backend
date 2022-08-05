import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.userAlbum;

export type CreateInput = pkg.Prisma.UserAlbumCreateInput
export type UpdateInput = pkg.Prisma.UserAlbumUpdateInput



async function create (userAlbum: CreateInput) {
    return db.create({data: userAlbum});
}

async function get (id: number) {
    return db.findFirst({where: {id}});
}

async function update (id: number, userAlbum: UpdateInput) {
    return db.update({where: {id}, data: userAlbum});
}

export default {
    create,
    get,
    update
}