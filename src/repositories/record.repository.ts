import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.record;

export type CreateInput = pkg.Prisma.RecordCreateInput
export type UpdateInput = pkg.Prisma.RecordUpdateInput



async function create (rankingRecord: CreateInput) {
    try {
        await db.create({data: rankingRecord});
    } catch (error) {
        console.log(error);
    }
}

async function get (id: number) {
    return await db.findFirst({where: {id}});
}

async function update (id: number, rankingRecord: UpdateInput) {
    return await db.update({where: {id}, data: rankingRecord});
}

async function getByRanking(rankingId: number) {
    return await db.findMany({
        where: {rankingId}
    });
}


export default {
    create,
    get,
    update,
    getByRanking
}