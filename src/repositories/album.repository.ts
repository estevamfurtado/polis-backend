import pkg from '@prisma/client';
import database from "../database.js";
import AppError from '../utils/errors/error.utils.js';

const db = database.prisma.album;

export type CreateInput = pkg.Prisma.AlbumCreateInput
export type UpdateInput = pkg.Prisma.AlbumUpdateInput

async function create (album: CreateInput) {
    try {
        return await db.create({data: album});
    } catch (e) {
        throw AppError.wrongSchema('Wrong album schema');
    }
}

async function get (id: number) {
    try {
        return await db.findFirst({where: {id}});
    } catch (e) {
        throw AppError.wrongSchema('Wrong id');
    }
}

async function update (id: number, album: UpdateInput) {
    try {
        return await db.update({where: {id}, data: album});
    } catch (e) {
        throw AppError.wrongSchema('Wrong schema');
    }
}

async function getByYear (year: number) {
    try {
        return await db.findFirst(
            {where: {year},
            include: {pages: {select: {id: true}}}}
        );
    } catch (e) {
        throw AppError.wrongSchema('Wrong schema');
    }
}

async function getAlbumWithPageIds (year: number) {
    try {
        const userAlbum = await db.findFirst({
            where: {year},
            include: {
                pages: {
                    select: {id: true},
                    orderBy: {orderInAlbum: 'asc'}
                },
            },
        });
        return userAlbum;
    } catch (e) {
        throw AppError.wrongSchema('Wrong schema');
    }
}

async function getCompleteAlbum (year: number) {
    try {
        const userAlbum = await db.findFirst({
            where: {year},
            include: {
                pages: {
                    orderBy: {orderInAlbum: 'asc'},
                    include: {
                        stickers: {
                            orderBy: {orderInPage: 'asc'},
                            include: {
                                partyRecord: true,
                                politicianRecord: true,
                            }
                        }
                    }
                }
            }
        });
        return userAlbum;
    } catch (e) {
        throw AppError.wrongSchema('Wrong schema');
    }
}

export default {
    create,
    get,
    update,
    getByYear,
    getAlbumWithPageIds,
    getCompleteAlbum
}