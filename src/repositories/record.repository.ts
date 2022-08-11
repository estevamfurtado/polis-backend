import pkg from '@prisma/client';
import database from "../database.js";
import errorUtils from '../utils/errors/error.utils.js';

const db = database.prisma.record;

export type CreateInput = pkg.Prisma.RecordCreateInput
export type UpdateInput = pkg.Prisma.RecordUpdateInput



async function create (rankingRecord: CreateInput) {
    try {
        await db.create({data: rankingRecord});
    } catch (error) {
        console.log(rankingRecord);
        console.log(error);
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function get (id: number) {
    try {
        return await db.findFirst({where: {id}});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong id');
    }
}

async function update (id: number, rankingRecord: UpdateInput) {
    try {
        return await db.update({where: {id}, data: rankingRecord});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function getByRanking(rankingId: number) {
    try {
        return await db.findMany({
            where: {rankingId},
            orderBy: {scoreTotal: 'desc'}
        });
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}


export default {
    create,
    get,
    update,
    getByRanking
}