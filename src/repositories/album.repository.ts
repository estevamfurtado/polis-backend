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
    return await db.findFirst(
        {where: {year},
        include: {pages: {select: {id: true}}}}
    );
}

async function getAlbumWithPageIds (year: number) {
    const userAlbum = await db.findFirst({
        where: {year},
        include: {
            pages: {select: {id: true}},
        }
    });
    return userAlbum;
}

export default {
    create,
    get,
    update,
    getByYear,
    getAlbumWithPageIds
}