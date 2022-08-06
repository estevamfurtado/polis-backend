import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma, { Card } from '@prisma/client';
import cardModelService from './cardModel.service.js';
import albumService from './album.service.js';
import loggerUtils from '../utils/logger.utils.js';
import personRepository from '../repositories/person.repository.js';

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

    console.log(`create ${amount} to ${ownerId}`)

    const getCards = await cardModelService.getByRanking(1);

    const model = getCards.sort((a, b) => b.record.scoreTotal - a.record.scoreTotal);

    const length = model.length;

    for (let i = 0; i < amount; i++) {
        const randomGroup = Math.random();
        const randomElement = Math.random();
        let modelId = null;
        let index = 0;

        if (randomGroup < 0.6) {
            index = Math.floor((0.0 + 0.6 * randomElement) * length)
        } else if (randomGroup < 0.8) {
            index = Math.floor((0.5 + 0.3 * randomElement) * length)
        } else {
            index = Math.floor((0.8 + 0.2 * randomElement) * length)
        }

        modelId = model[index].id;

        await repo.create({
            owner: {connect: {id: ownerId}},
            model: {connect: {id: modelId}},
        });
    }
}

async function pasteAll (userId: number) {
    loggerUtils.log('service', 'Paste All');
    const cards = await repo.getAllByOwner(userId);
    
    const isPastedHT = {}
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].isPasted) {
            isPastedHT[cards[i].modelId] = true
        }
    }

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const modelId = card.modelId;
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
        throw AppError.forbidden(`There is already a card with model ${card.modelId} pasted by ${card.ownerId}`);
    }
    await repo.update(cardId, {isPasted: true});
}

async function checkIfUserHasCardPastedWithSameModel (card: Card) {
    const ownerId = card.ownerId;
    const modelId = card.modelId;
    const result = await repo.getPastedByOwnerIdModelId(ownerId, modelId);
    return result.length > 0;
}

async function getAllCardsFromUser (userId: number) {
    loggerUtils.log('service', 'getAllCardsFromUser');
    const cards = await repo.getAllByOwnerWithDetails(userId);
    return cards;
}

async function validateOwnership(cardId: number, ownerId: number) {
    const card = await validateOrCrash(cardId);
    if (card.ownerId !== ownerId) {
        throw AppError.forbidden(`Card with id ${cardId} is not owned by ${ownerId}`);
    }
    return card;
}

export default { validateOrCrash, createRandomNewCardsToUser, pasteAll, pasteOrCrash, getAllCardsFromUser, validateOwnership };