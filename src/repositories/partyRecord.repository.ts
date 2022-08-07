import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.partyRecord;

export type CreateInput = pkg.Prisma.PartyRecordCreateInput
export type UpdateInput = pkg.Prisma.PartyRecordUpdateInput

async function getWithRecordsAndScores (year: number, partyAbbreviation: string) {
    return await db.findFirst({
        where: {
            rankingYear: year,
            partyAbbreviation: partyAbbreviation
        },
        include: {
            records: true,
            scores: true
        },
    });
}

async function create (partyRecord: CreateInput) {
    return await db.create({data: partyRecord});
}

async function get (id: number) {
    return await db.findFirst({where: {id}});
}

async function update (id: number, partyRecord: UpdateInput) {
    return await db.update({where: {id}, data: partyRecord});
}

async function updateScores(id: number, newScores: pkg.Prisma.PartyScoreUpdateWithWhereUniqueWithoutPartyRecordInput[]) {
    return await db.update({
        where: {id},
        data: {scores: {
            update: newScores
        }}
    });
}

async function getAllWithRecordsAndScores (year?: number) {
    const where = year ? {where: {rankingYear: year}} : null;
    return await db.findMany({
        ...where,
        include: {
            records: {
                include: {
                    politician: true,
                }
            },
            scores: true,
            party: true
        }
    });
}

async function getByRanking (rankingId: number) {
    return await db.findMany({
        where: { ranking: { id: rankingId } },
        include: {
            records: { select: {id: true} },
            scores: true,
        }
    });
}

export default {
    create,
    get,
    update,
    getWithRecordsAndScores,
    updateScores,
    getAllWithRecordsAndScores,
    getByRanking
}