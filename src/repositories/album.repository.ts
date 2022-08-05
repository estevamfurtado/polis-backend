import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.album;

export type CreateInput = pkg.Prisma.AlbumCreateInput
export type UpdateInput = pkg.Prisma.AlbumUpdateInput



async function create (album: CreateInput) {
    return await db.create({data: album});
}

async function get (id: number) {
    return await db.findFirst({where: {id}});
}

async function update (id: number, album: UpdateInput) {
    return await db.update({where: {id}, data: album});
}

async function getByYear (year: number) {
    return await db.findFirst({where: {year}});
}

async function createToUser (albumId: number, userId: number) {
    const userAlbum = await database.prisma.userAlbum.create({
        data: {
            user: {connect: {id: userId}},
            album: {connect: {id: albumId}},
        }
    });
}

export default {
    create,
    get,
    update,
    getByYear,
    createToUser
}