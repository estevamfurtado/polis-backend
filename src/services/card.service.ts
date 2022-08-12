import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma, { Card, StickerAvailabilityTypes } from '@prisma/client';
import albumService from './album.service.js';
import loggerUtils from '../utils/logger.utils.js';
import personRepository from '../repositories/person.repository.js';
import variables from './variables.js';
import stickerService from './sticker.service.js';
import { connect } from 'http2';

type Element = Prisma.Card;
type CreateInput = Prisma.Prisma.CardCreateInput;
type UpdateInput = Prisma.Prisma.CardUpdateInput;

const repo = repos.card;

async function validateOrCrash (id: number) : Promise<Element> {
    loggerUtils.log('service', 'Validate card by id or crash');
    const result = await repo.get(id);
    console.log(result);
    if (!result) {
        throw AppError.notFound(`Card with id ${id} does not exist`);
    }
    return result;
}

async function createRandomNewCardsToUser (ownerId: number, amount: number) {
    for (let i = 0; i < amount; i++) {
        await createNewRandomCardToUser(ownerId);
    }
}


async function createNewRandomCardToUser (ownerId: number) {
    loggerUtils.log('service', 'createNewRandomCardsToUser');
    const sortAvailability = Math.random();
    const availability: StickerAvailabilityTypes = sortAvailability > 0.9 ? 'rare' :  sortAvailability > 0.5 ? 'medium' : 'easy';
    const stickers = await stickerService.getAllStickersByYearAndAvailability(variables.LAST_YEAR, availability);
    const sortSticker = Math.random();
    const sticker = stickers[Math.floor(sortSticker * stickers.length)];
    
    const card = await repo.create({
        owner: {connect: {id: ownerId}},
        sticker: {connect: {id: sticker.id}}
    })
}

async function pasteAll (userId: number) {
    loggerUtils.log('service', 'Paste All');
    const cards = await repo.getAllByOwner(userId);
    
    const isPastedHT = {}
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].isPasted) {
            isPastedHT[cards[i].stickerId] = true
        }
    }

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const modelId = card.stickerId;
        const isPasted = card.isPasted;

        if (isPasted) {
            isPastedHT[modelId] = true;
        } else if (!isPastedHT[modelId]) {
            await pasteOrCrash(card);
            isPastedHT[modelId] = true;
        }
    }
}

async function pasteOrCrash (card: Card) {
    loggerUtils.log('service', 'Paste card');
    const cardId = card.id;
    const modelIsPasted = await checkIfUserHasCardPastedWithSameModel(card);
    if (modelIsPasted) {
        throw AppError.forbidden(`There is already a card with model ${card.stickerId} pasted by ${card.ownerId}`);
    }
    await repo.update(cardId, {isPasted: true});
}

async function checkIfUserHasCardPastedWithSameModel (card: Card) {
    const ownerId = card.ownerId;
    const modelId = card.stickerId;
    const result = await repo.getPastedByOwnerIdModelId(ownerId, modelId);
    return result.length > 0;
}

async function getAllCardsFromUser (userId: number) {
    loggerUtils.log('service', 'getAllCardsFromUser');
    const cards = await repo.getAllByOwnerWithDetails(userId);
    return cards;
}

async function getAllByOwner (ownerId: number) {
    loggerUtils.log('service', 'getAllByOwnerAndAlbum');
    const cards = await repo.getAllByOwner(ownerId);
    return cards;
}

async function validateOwnership(cardId: number, ownerId: number) {
    const card = await validateOrCrash(cardId);
    if (card.ownerId !== ownerId) {
        throw AppError.forbidden(`Card with id ${cardId} is not owned by ${ownerId}`);
    }
    return card;
}

async function toggleMark (cardId: number, ownerId: number) {
    loggerUtils.log('service', 'toggleMark');
    const card = await validateOwnership(cardId, ownerId);
    const isMarked = card.forExchange;
    await repo.update(cardId, {forExchange: !isMarked});
}

async function changeOwner (cardId: number, previousOwnerId: number, newOwnerId: number) {
    const card = await repo.get(cardId);
    if (card.ownerId === previousOwnerId) {
        await repo.update(cardId, {owner: {connect: {id: newOwnerId}}});
    }
}

async function validateOwner (cardId: number, ownerId: number) {
    const card = await validateOrCrash(cardId);
    if (card.ownerId !== ownerId) {
        throw AppError.forbidden(`Card with id ${cardId} is not owned by ${ownerId}`);
    }
    return card;
}

export default { 
    validateOrCrash, 
    createRandomNewCardsToUser, 
    pasteAll, 
    pasteOrCrash, 
    getAllCardsFromUser, 
    validateOwnership,
    getAllByOwner,
    toggleMark,
    changeOwner
};