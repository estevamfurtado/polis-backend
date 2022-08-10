import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';


import cardModelService from './cardModel.service.js';
import politicalPartyService from './party.service.js';
import stickerService from './sticker.service.js';
import partyRecordService from './partyRecord.service.js';
import albumRepository from '../repositories/album.repository.js';

type Element = Prisma.Page;
type CreateInput = Prisma.Prisma.PageCreateInput;
type UpdateInput = Prisma.Prisma.PageUpdateInput;

const repo = repos.page;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`Page with id ${id} does not exist`);
    }
    return result;
}


async function createAlbumBasePages(albumId: number, year: number) {

    console.log('creating pages');

    const partyRecords = await partyRecordService.getOrderedByTotalScores(year);
    let predecessorId = null;
    
    console.log(partyRecords.length);

    let first = true;
    for (const record of partyRecords) {

        const predecessorObj = predecessorId ? {predecessor: {connect: {id: predecessorId}}} : {}

        const create = {
            title: `${record.party.name} - ${record.party.abbreviation}`,
            description: '',
            backgroundColor: record.party.mainColor ? record.party.mainColor : '#ffffff',
            album: {connect: {id: albumId}},
            ...predecessorObj
        }

        const page = await repo.create(create);
        predecessorId = page.id;

        if (first) {
            await albumRepository.update(albumId, {entryPage: {connect: {id: page.id}}});
            first = false;
        }

        await stickerService.createPartyPageBaseStickers(albumId, page.id, record.records, record.partyAbbreviation);
    }

}

async function getPagesByAlbum (albumId: number) {
    const result = await repo.getPagesWithStickersIds(albumId);
    return result;
}

export default { 
    validateOrCrash, 
    createAlbumBasePages,
    getPagesByAlbum
};