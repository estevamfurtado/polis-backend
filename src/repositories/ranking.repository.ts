import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.ranking;

export type CreateInput = pkg.Prisma.RankingCreateInput
export type UpdateInput = pkg.Prisma.RankingUpdateInput



async function create (ranking: CreateInput) {
    return await db.create({data: ranking});
}

async function get (id: number) {
    return await db.findFirst({where: {id}});
}

async function getByYear (year: number) {
    return await db.findFirst({where: {year}});
}

async function update (id: number, ranking: UpdateInput) {
    return await db.update({where: {id}, data: ranking});
}

export default {
    create,
    get,
    getByYear,
    update
}