import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.card;

export type CreateInput = pkg.Prisma.CardCreateInput
export type UpdateInput = pkg.Prisma.CardUpdateInput



async function create (card: CreateInput) {
    return db.create({data: card});
}

async function get (id: number) {
    return db.findFirst({where: {id}});
}

async function update (id: number, card: UpdateInput) {
    return db.update({where: {id}, data: card});
}

export default {
    create,
    get,
    update
}