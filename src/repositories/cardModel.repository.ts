import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.cardModel;

export type CreateInput = pkg.Prisma.CardModelCreateInput
export type UpdateInput = pkg.Prisma.CardModelUpdateInput



async function create (cardModel: CreateInput) {
    return db.create({data: cardModel});
}

async function get (id: number) {
    return db.findFirst({where: {id}});
}

async function update (id: number, cardModel: UpdateInput) {
    return db.update({where: {id}, data: cardModel});
}

export default {
    create,
    get,
    update
}