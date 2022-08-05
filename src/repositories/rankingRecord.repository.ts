import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.rankingRecord;

export type CreateInput = pkg.Prisma.RankingRecordCreateInput
export type UpdateInput = pkg.Prisma.RankingRecordUpdateInput



async function create (rankingRecord: CreateInput) {
    return await db.create({data: rankingRecord});
}

async function get (id: number) {
    return await db.findFirst({where: {id}});
}

async function update (id: number, rankingRecord: UpdateInput) {
    return await db.update({where: {id}, data: rankingRecord});
}

export default {
    create,
    get,
    update
}