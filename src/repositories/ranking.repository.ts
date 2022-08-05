import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.ranking;

export type CreateInput = pkg.Prisma.RankingCreateInput
export type UpdateInput = pkg.Prisma.RankingUpdateInput



async function create (ranking: CreateInput) {
    return db.create({data: ranking});
}

async function get (id: number) {
    return db.findFirst({where: {id}});
}

async function getByYear (year: number) {
    return db.findFirst({where: {year}});
}

async function update (id: number, ranking: UpdateInput) {
    return db.update({where: {id}, data: ranking});
}

export default {
    create,
    get,
    getByYear,
    update
}