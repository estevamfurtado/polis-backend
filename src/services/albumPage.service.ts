import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';


import cardModelService from '../services/cardModel.service.js';
import politicalPartyService from '../services/politicalParty.service.js';
import stickerService from '../services/sticker.service.js';

type Element = Prisma.AlbumPage;
type CreateInput = Prisma.Prisma.AlbumPageCreateInput;
type UpdateInput = Prisma.Prisma.AlbumPageUpdateInput;

const repo = repos.albumPage;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`AlbumPage with id ${id} does not exist`);
    }
    return result;
}

async function createAlbumBasePages(albumId: number, rankingId: number) {
    const parties = await politicalPartyService.getOrderedByRanking(rankingId);
    let predecessorId = null;

    for (const party of parties) {
        const page = await createChainedPartyAlbumPage(albumId, party, predecessorId);
        predecessorId = page.id;
    }
}

async function createChainedPartyAlbumPage(albumId: number, party: any, predecessorId?: number) {
    
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