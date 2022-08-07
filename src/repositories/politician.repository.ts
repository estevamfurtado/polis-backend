import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.politician;

export type CreateInput = pkg.Prisma.PoliticianCreateInput
export type UpdateInput = pkg.Prisma.PoliticianUpdateInput



async function create (politician: CreateInput) {
    return await db.create({data: politician});
}

async function get (id: number) {
    return await db.findFirst({where: {id}});
}

async function update (id: number, politician: UpdateInput) {
    return await db.update({where: {id}, data: politician});
}

async function getAll () {
    return await db.findMany({
        include: {
            records: {
                select: {id: true},
            }
        }
    });
}

export default {
    create,
    get,
    update,
    getAll
}