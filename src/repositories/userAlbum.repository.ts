import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.userAlbum;

export type CreateInput = pkg.Prisma.UserAlbumCreateInput
export type UpdateInput = pkg.Prisma.UserAlbumUpdateInput



async function create (userAlbum: CreateInput) {
    return await db.create({data: userAlbum});
}

async function get (id: number) {
    return await db.findFirst({where: {id}});
}

async function update (id: number, userAlbum: UpdateInput) {
    return await db.update({where: {id}, data: userAlbum});
}

async function getByAlbumAndPerson (albumId: number, personId: number) {
    return await db.findFirst({where: {albumId, userId: personId},
        include: { 
            cards: {
                include: {
                    model: true
                }
            }
        }
    });
}

async function connectToCard (userAlbumId: number, cardId: number, ) {
    return await db.update({where: {id: userAlbumId}, data: {
        cards: {
            connect: {
                id: cardId
            }
        }
    }});
}

export default {
    create,
    get,
    update,
    getByAlbumAndPerson,
    connectToCard
}