import pkg from '@prisma/client';
import database from "../database.js";
import errorUtils from '../utils/errors/error.utils.js';

const db = database.prisma.party;

export type CreateInput = pkg.Prisma.PartyCreateInput
export type UpdateInput = pkg.Prisma.PartyUpdateInput



async function create (politicalParty: CreateInput) {
    try {
        return await db.create({data: politicalParty});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong politicalParty schema');
    }
}

async function createMany (data: CreateInput[]) {
    try {
        return await db.createMany({data});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong politicalParty schema');
    }
}

async function get (id: number) {
    try {
        return await db.findFirst({where: {id}});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong id');
    }
}

async function update (id: number, politicalParty: UpdateInput) {
    try {
        return await db.update({where: {id}, data: politicalParty});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function getByRankingIdWithRecordsWithPoliticians(rankingId: number) {
    try {
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
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function getAll() {
    try {
        return await db.findMany({
            include: {
                politicians: {select: {id: true}},
                records: {select: {id: true}},
                partyRecords: {select: {id: true}},
            }
        });
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

export default {
    create,
    createMany,
    get,
    update,
    getByRankingIdWithRecordsWithPoliticians,
    getAll
}