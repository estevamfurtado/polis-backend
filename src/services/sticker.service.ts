import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma, { Page, Party, PartyRecord, Politician, Record, StickerAvailabilityTypes } from '@prisma/client';
import pageService from './page.service.js';

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

async function createPartyPageBaseStickers(page: Page, partyRecord: PartyRecord & {party: Party} & {records: (Record & {politician: Politician})[]}) {
    const abb = partyRecord.party.abbreviation;
    let identifier = 1;
    await createPartySticker(partyRecord, `${abb} - ${identifier}`, page.id, identifier);
    for (const record of partyRecord.records) {
        identifier++;
        const sticker = await createPoliticianSticker(record, `${abb} - ${identifier}`, page.id, identifier)
    }
}

async function createPartySticker (partyRecord: PartyRecord & {party: Party}, identifier: string, pageId: number, order: number) {
    const create : CreateInput = {
        type: 'party',
        availability: 'rare',
        identifier: identifier,
        title: partyRecord.party.name,
        imageUrl: partyRecord.party.logoUrl,
        page: {connect: {id: pageId}},
        orderInPage: order,
        partyRecord: {connect: {id: partyRecord.id}},
    }
    const sticker = await repo.create(create);
    return sticker;
}

async function createPoliticianSticker (politicianRecord: Record & {politician: Politician}, identifier: string, pageId: number, order: number) {
    
    const availability = politicianRecord.scoreTotal > 7.5 ? 'rare' : (politicianRecord.scoreTotal > 6.5 ? 'medium' : 'easy');
    
    const create : CreateInput = {
        type: 'politician',
        availability: availability,
        identifier: identifier,
        title: politicianRecord.politician.name,
        imageUrl: politicianRecord.politician.imageUrl,
        page: {connect: {id: pageId}},
        orderInPage: order,
        politicianRecord: {connect: {id: politicianRecord.id}},
    }
    const sticker = await repo.create(create);
    return sticker;
}


async function getStickersByAlbum(albumId: number) {
    return await repo.getAllByAlbumId(albumId);
}

async function getAllStickersByYearAndAvailability (year: number, availability: StickerAvailabilityTypes) {
    return await repo.getAllByYearAndAvailability(year, availability);
}

async function getByYear (year: number) {
    return await repo.getAllByYear(year);
}

export default { getByYear, validateOrCrash, createPartyPageBaseStickers, getStickersByAlbum, getAllStickersByYearAndAvailability };