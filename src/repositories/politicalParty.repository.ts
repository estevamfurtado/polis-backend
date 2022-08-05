import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.politicalParty;

export type CreateInput = pkg.Prisma.PoliticalPartyCreateInput
export type UpdateInput = pkg.Prisma.PoliticalPartyUpdateInput



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
            rankingRecords: {
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

export default {
    create,
    get,
    update,
    getByRankingIdWithRecordsWithPoliticians
}