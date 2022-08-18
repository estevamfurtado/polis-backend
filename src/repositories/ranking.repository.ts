import pkg from '@prisma/client';
import database from "../database.js";
import errorUtils from '../utils/errors/error.utils.js';

const db = database.prisma.ranking;

export type CreateInput = pkg.Prisma.RankingCreateInput
export type UpdateInput = pkg.Prisma.RankingUpdateInput

async function createMany (input: CreateInput[]) {
    try {
        return await db.createMany({data: input});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function create (ranking: CreateInput) {
    try {
        return await db.create({data: ranking});
    } catch (e) {
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

async function getByYear (year: number) {
    try {
        return await db.findFirst({
        where: {year},
        include: {
            records: {select: {id: true}},
            partyRecords: {select: {id: true}}
        }
    });
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function update (id: number, ranking: UpdateInput) {
    try {
        return await db.update({where: {id}, data: ranking});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function getAll() {
    try {
        return await db.findMany();
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function getAllWithPartyRecords() {
    try {
        return await db.findMany(
            {
                include: {
                    partyRecords: true
                }
            }
        );
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function getLastCompleteRanking (year: number) {
    try {
        return await db.findFirst({
            where: {year},
            include: {
                partyRecords: {
                    orderBy: {scoreTotal: 'desc'},
                    include: {
                        party: true,
                        records: {
                            orderBy: {scoreTotal: 'desc'},
                        }
                    }
                },
                records: {
                    orderBy: {scoreTotal: 'desc'},
                    include: {
                        politician: true,
                        party: true,
                        state: true,
                    },
                }
            }
        });
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

export default {
    create,
    get,
    getByYear,
    update,
    createMany,
    getAll,
    getAllWithPartyRecords,
    getLastCompleteRanking
}