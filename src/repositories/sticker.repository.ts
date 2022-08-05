import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.sticker;

export type CreateInput = pkg.Prisma.StickerCreateInput
export type UpdateInput = pkg.Prisma.StickerUpdateInput



async function create (sticker: CreateInput) {
    return db.create({data: sticker});
}

async function get (id: number) {
    return db.findFirst({where: {id}});
}

async function update (id: number, sticker: UpdateInput) {
    return db.update({where: {id}, data: sticker});
}

export default {
    create,
    get,
    update
}