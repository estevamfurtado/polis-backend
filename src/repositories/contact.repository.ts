import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.contact;

export type CreateInput = pkg.Prisma.ContactCreateInput
export type UpdateInput = pkg.Prisma.ContactUpdateInput



async function create (contact: CreateInput) {
    return await db.create({data: contact});
}

async function get (id: number) {
    return await db.findFirst({where: {id}});
}

async function update (id: number, contact: UpdateInput) {
    return await db.update({where: {id}, data: contact});
}

export default {
    create,
    get,
    update
}