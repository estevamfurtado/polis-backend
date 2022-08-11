import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';

type Element = Prisma.PartyRecord;
type CreateInput = Prisma.Prisma.PartyRecordCreateInput;
type UpdateInput = Prisma.Prisma.PartyRecordUpdateInput;

const repo = repos.partyRecord;

async function validateOrCrash (id: number) {
    const result = await repo.get.byId(id);
    if (!result) {
        throw AppError.notFound(`Record with id ${id} does not exist`);
    }
    return result;
}

async function createManyEach (records: CreateInput[]) {
    for (const record of records) {
        await repo.create(record);
    }
}


type PartyRecordWithRecords = Prisma.PartyRecord & {
    records: Prisma.Record[];
};

async function populate () {
    const parties = await repos.party.getAll();
    const rankings = await repos.ranking.getAll();
    for (const party of parties) {
        for (const ranking of rankings) {
            await repo.create({
                party: { connect: { abbreviation: party.abbreviation } },
                ranking: { connect: { id: ranking.id } },
            });
        }
    }
}


async function updateAllScores () {
    const partyRecords = await repo.get.all(null, null);
    for (const partyRecord of partyRecords) {
        await updateScores(partyRecord);
    }
}

async function updateScores (partyRecord: PartyRecordWithRecords) {
    
    const total = {
        scoreTotal: 0,
        scoreTotalCount: 0,
        scoreTotalSum: 0,
    }
    const internal = {
        scoreInternal: 0,
        scoreInternalCount: 0,
        scoreInternalSum: 0,
    }
    const presence = {
        scorePresence: 0,
        scorePresenceCount: 0,
        scorePresenceSum: 0,
    }
    const privileges = {
        scorePrivileges: 0,
        scorePrivilegesCount: 0,
        scorePrivilegesSum: 0,
    }
    const wastage = {
        scoreWastage: 0,
        scoreWastageCount: 0,
        scoreWastageSum: 0,
    }
    const saveQuota = {
        scoreSaveQuota: 0,
        scoreSaveQuotaCount: 0,
        scoreSaveQuotaSum: 0,
    }
    const process = {
        scoreProcess: 0,
        scoreProcessCount: 0,
        scoreProcessSum: 0,
    }

    for (const record of partyRecord.records) {
        total.scoreTotalCount += 1;
        total.scoreTotalSum += record.scoreTotal;
        internal.scoreInternalCount += 1;
        internal.scoreInternalSum += record.scoreInternal;
        presence.scorePresenceCount += 1;
        presence.scorePresenceSum += record.scorePresence;
        privileges.scorePrivilegesCount += 1;
        privileges.scorePrivilegesSum += record.scorePrivileges;
        wastage.scoreWastageCount += 1;
        wastage.scoreWastageSum += record.scoreWastage;
        saveQuota.scoreSaveQuotaCount += 1;
        saveQuota.scoreSaveQuotaSum += record.scoreSaveQuota;
        process.scoreProcessCount += 1;
        process.scoreProcessSum += record.scoreProcess;
    }
    total.scoreTotal = total.scoreTotalSum > 0 && total.scoreTotalCount > 0 ? total.scoreTotalSum / total.scoreTotalCount : 0;
    internal.scoreInternal = internal.scoreInternalSum > 0 && internal.scoreInternalCount > 0 ? internal.scoreInternalSum / internal.scoreInternalCount : 0;
    presence.scorePresence = presence.scorePresenceSum > 0 && presence.scorePresenceCount > 0 ? presence.scorePresenceSum / presence.scorePresenceCount : 0;
    privileges.scorePrivileges = privileges.scorePrivilegesSum > 0 && privileges.scorePrivilegesCount > 0 ? privileges.scorePrivilegesSum / privileges.scorePrivilegesCount : 0;
    wastage.scoreWastage = wastage.scoreWastageSum > 0 && wastage.scoreWastageCount > 0 ? wastage.scoreWastageSum / wastage.scoreWastageCount : 0;
    saveQuota.scoreSaveQuota = saveQuota.scoreSaveQuotaSum > 0 && saveQuota.scoreSaveQuotaCount > 0 ? saveQuota.scoreSaveQuotaSum / saveQuota.scoreSaveQuotaCount : 0;
    process.scoreProcess = process.scoreProcessSum > 0 && process.scoreProcessCount > 0 ? process.scoreProcessSum / process.scoreProcessCount : 0;

    const update = {
        ...total,
        ...internal,
        ...presence,
        ...privileges,
        ...wastage,
        ...saveQuota,
        ...process,
    }
    await repo.update(partyRecord.id, update);
}

async function getByYear (year: number) {
    return await repo.get.all(null, year);
}

async function getByYearWithDetails (year: number) {
    return await repo.get.all(null, year);
}


export default { 
    validateOrCrash, 
    createManyEach, 
    updateScores, 
    updateAllScores, 
    getByYear,
    getByYearWithDetails,
    populate,
}