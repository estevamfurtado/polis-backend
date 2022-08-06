import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';
import cardModelService from './cardModel.service.js';

type Element = Prisma.Sticker;
type CreateInput = Prisma.Prisma.StickerCreateInput;
type UpdateInput = Prisma.Prisma.StickerUpdateInput;

const repo = repos.sticker;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`Sticker with id ${id} does not exist`);
    }
    return result;
}

async function createPartyPageBaseStickers(albumId: number, pageId: number, orderedRecords: any[]) {
    let predecessorId = null;
    let identifier = 1;
    for (const record of orderedRecords) {
        const sticker = await createChainedPartyPageBaseSticker(pageId, record, identifier, predecessorId)
        predecessorId = sticker.id;
        identifier++;
    }
}

async function createChainedPartyPageBaseSticker(pageId: number, record: any, identifier: number, predecessorId?: number) {
    
    const predecessorObj = predecessorId ? {
        predecessor: {connect: {id: predecessorId}}
    } : {}
    
    const cardModel = await cardModelService.createByRankingRecord(record);
    const sticker = await repo.create({
        page: {connect: {id: pageId}},
        card: {connect: {id: cardModel.id}},
        identifier: `${record.partyAbbreviation}${identifier}`,
        ...predecessorObj
    })
    return sticker;
}

export default { validateOrCrash, createPartyPageBaseStickers };