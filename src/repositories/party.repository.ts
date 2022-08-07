import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.party;

export type CreateInput = pkg.Prisma.PartyCreateInput
export type UpdateInput = pkg.Prisma.PartyUpdateInput



async function create (politicalParty: CreateInput) {
    return await db.create({data: politicalParty});
}

async function get (id: number) {
    return await db.findFirst({where: {id}});
}

async function update (id: number, politicalParty: UpdateInput) {
    return await db.update({where: {id}, data: politicalParty});
}

async function getByRankingIdWithRecordsWithPoliticians(rankingId: number) {
    return await db.findMany({
        include: {
            records: {
                where: {
                    rankingId
                },
                include: {
                    politician: true
                }
            }
        }
    });
}

async function getAll() {
    return await db.findMany({
        include: {
            politicians: {select: {id: true}},
            records: {select: {id: true}},
            candidates: {select: {id: true}},
            PartyRecord: {select: {id: true}},
        }
    });
}

export default {
    create,
    get,
    update,
    getByRankingIdWithRecordsWithPoliticians,
    getAll
}