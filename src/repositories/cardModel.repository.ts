import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.cardModel;

export type CreateInput = pkg.Prisma.CardModelCreateInput
export type UpdateInput = pkg.Prisma.CardModelUpdateInput



async function create (cardModel: CreateInput) {
    return await db.create({data: cardModel});
}

async function get (id: number) {
    return await db.findFirst({where: {id}});
}

async function update (id: number, cardModel: UpdateInput) {
    return await db.update({where: {id}, data: cardModel});
}

async function getByRanking(rankingId: number) {
    return await db.findMany({
        where: {record: {ranking: {id: rankingId}}},
        include: {
            record: {select: {id: true}},
            stickers: {select: {id: true}}
        },
    });
}

async function getByRankingWithRecords(rankingId: number) {
    return await db.findMany({
        where: {record: {ranking: {id: rankingId}}},
        include: {
            record: true,
            stickers: {select: {id: true}}
        },
    });
}


export default {
    create,
    get,
    update,
    getByRanking,
    getByRankingWithRecords
}