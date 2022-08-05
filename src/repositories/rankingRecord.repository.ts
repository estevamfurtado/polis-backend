import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.rankingRecord;

export type CreateInput = pkg.Prisma.RankingRecordCreateInput
export type UpdateInput = pkg.Prisma.RankingRecordUpdateInput



async function create (rankingRecord: CreateInput) {
    return db.create({data: rankingRecord});
}

async function get (id: number) {
    return db.findFirst({where: {id}});
}

async function update (id: number, rankingRecord: UpdateInput) {
    return db.update({where: {id}, data: rankingRecord});
}

export default {
    create,
    get,
    update
}