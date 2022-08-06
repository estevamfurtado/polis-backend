import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';


import cardModelService from './cardModel.service.js';
import politicalPartyService from './party.service.js';
import stickerService from './sticker.service.js';

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

async function createAlbumBasePages(albumId: number, rankingId: number) {
    const parties = await politicalPartyService.getOrderedByRanking(rankingId);
    let predecessorId = null;

    for (const party of parties) {
        const page = await createChainedPartyPage(albumId, party, predecessorId);
        predecessorId = page.id;
    }
}

async function createChainedPartyPage(albumId: number, party: any, predecessorId?: number) {
    
    const predecessorObj = predecessorId ? {
        predecessor: {connect: {id: predecessorId}}
    } : {}

    const page = await repo.create({
        album: {connect: {id: albumId}},
        title: party.name,
        description: '',
        backgroundColor: party.color ? party.color : '#ffffff',
        ...predecessorObj
    });

    await stickerService.createPartyPageBaseStickers(albumId, page.id, party.rankingRecords);
    return page;
}

export default { validateOrCrash, createAlbumBasePages };