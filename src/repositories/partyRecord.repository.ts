import pkg from '@prisma/client';
import database from "../database.js";
import errorUtils from '../utils/errors/error.utils.js';

const db = database.prisma.partyRecord;

export type CreateInput = pkg.Prisma.PartyRecordCreateInput
export type UpdateInput = pkg.Prisma.PartyRecordUpdateInput

async function getAll (rankingId?: number, rankingYear?: number) {
    try {
        const whereRankingId = rankingId ? {rankingId} : {}
        const whereRankingYear = rankingYear ? {rankingYear} : {}

        const where = {
            ...whereRankingId,
            ...whereRankingYear,
        }

        return await db.findMany({
            where,
            orderBy: {scoreTotal: "desc"},
            include: {
                party: true,
                records: {
                    orderBy: {scoreTotal: "desc"},
                    include: {politician: true}
                },
            },
        });
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function create (partyRecord: CreateInput) {
    try {
        return await db.create({data: partyRecord});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong partyRecord schema');
    }
}

async function getById (id: number) {
    try {
        return await db.findFirst({where: {id}});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong id');
    }
}

async function getByYearAndParty (year: number, partyAbbreviation: string) {
    return await db.findFirst({where: {
        rankingYear: year,
        partyAbbreviation,
    }});
}

async function update (id: number, partyRecord: UpdateInput) {
    try {
        return await db.update({where: {id}, data: partyRecord});
    } catch (e) {
        console.log(partyRecord);
        console.log(e);
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

export default {
    create,
    update,
    get: {
        all: getAll,
        byId: getById,
        byYearAndParty: getByYearAndParty,
    }
}