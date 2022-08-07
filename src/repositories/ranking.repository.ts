import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.ranking;

export type CreateInput = pkg.Prisma.RankingCreateInput
export type UpdateInput = pkg.Prisma.RankingUpdateInput

async function createMany (input: CreateInput[]) {
    return await db.createMany({data: input});
}

async function create (ranking: CreateInput) {
    return await db.create({data: ranking});
}

async function get (id: number) {
    return await db.findFirst({where: {id}});
}

async function getByYear (year: number) {
    return await db.findFirst({
        where: {year},
        include: {
            records: {select: {id: true}},
            partyRecords: {select: {id: true}}
        }
    });
}

async function update (id: number, ranking: UpdateInput) {
    return await db.update({where: {id}, data: ranking});
}

async function getAll() {
    return await db.findMany();
}

async function getAllWithPartyRecords() {
    return await db.findMany(
        {
            include: {
                partyRecords: true
            }
        }
    );
}

export default {
    create,
    get,
    getByYear,
    update,
    createMany,
    getAll,
    getAllWithPartyRecords
}