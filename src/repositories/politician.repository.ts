import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.politician;

export type CreateInput = pkg.Prisma.PoliticianCreateInput
export type UpdateInput = pkg.Prisma.PoliticianUpdateInput



async function create (politician: CreateInput) {
    return db.create({data: politician});
}

async function get (id: number) {
    return db.findFirst({where: {id}});
}

async function update (id: number, politician: UpdateInput) {
    return db.update({where: {id}, data: politician});
}

export default {
    create,
    get,
    update
}