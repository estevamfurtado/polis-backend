import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma, { Party, PartyRecord, Politician, Record } from '@prisma/client';


import stickerService from './sticker.service.js';
import partyRecordService from './partyRecord.service.js';
import loggerUtils from '../utils/logger.utils.js';

type Element = Prisma.Page;
type CreateInput = Prisma.Prisma.PageCreateInput;
type UpdateInput = Prisma.Prisma.PageUpdateInput;

const repo = repos.page;

async function validateOrCrash (id: number){
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`Page with id ${id} does not exist`);
    }
    return result;
}


async function createAlbumPages(year: number) {
    loggerUtils.log('service', 'Creating album pages');
    const partyRecords = await partyRecordService.getByYearWithDetails(year);
    let index = 0;
    for (const record of partyRecords) {
        await createPage(record, index);
        index++;
    }
}

async function createPage (record: (PartyRecord & {party: Party} & {records: (Record & {politician: Politician})[]}), orderInAlbum: number) {
    const create = {
        badge: `${record.party.abbreviation}`,
        title: `${record.party.name}`,
        description: '',
        backgroundColor: record.party.mainColor ? record.party.mainColor : '#333333',
        album: {connect: {year: record.rankingYear}},
        orderInAlbum: orderInAlbum,
    }
    const page = await repo.create(create);
    await stickerService.createPartyPageBaseStickers(page, record);
}


async function getPagesByAlbum (albumId: number) {
    const result = await repo.getPagesWithStickersIds(albumId);
    return result;
}

export default { 
    validateOrCrash, 
    createAlbumPages,
    getPagesByAlbum
};