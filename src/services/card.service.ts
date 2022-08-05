import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';
import cardModelService from './cardModel.service.js';
import userAlbumService from './userAlbum.service.js';
import albumService from './album.service.js';

type Element = Prisma.Card;
type CreateInput = Prisma.Prisma.CardCreateInput;
type UpdateInput = Prisma.Prisma.CardUpdateInput;

const repo = repos.card;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`Card with id ${id} does not exist`);
    }
    return result;
}


async function createRandomNewCardsToUser (personId: number, amount: number) {
    const getCards = await cardModelService.getByRanking(1);

    const model = getCards.sort((a, b) => b.record.scoreTotal - a.record.scoreTotal);
    console.log(model[0].record.scoreTotal);

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
            owner: {connect: {id: personId}},
            model: {connect: {id: modelId}},
        });
    }
}

async function pasteAll (userId: number) {
    const cards = await repo.getAllByOwner(userId);
    for (let i = 0; i < cards.length; i++) {
        if (!cards[i].isPasted) {
            await paste(cards[i].id);
        }
    }
}

async function paste (cardId: number) {

    const card = await validateOrCrash(cardId);
    const ownerId = card.ownerId;

    // check if UserAlbum already has card
    const cardWithAlbum = await repo.getWithAlbum(card.modelId);
    const cardModelId = cardWithAlbum.modelId;
    const albumId = cardWithAlbum.model.Sticker[0].page.album.id;
    const userAlbum = await userAlbumService.getByAlbumAndPerson(albumId, ownerId);
    const userAlbumId = userAlbum.id;
    let has = false;
    userAlbum.cards.forEach(card => {
        if (card.modelId === cardModelId) {
            has = true;
        }
    })

    if (!has) {
        await userAlbumService.connectToCard(userAlbumId, cardId);
        await repo.update(cardId, {isPasted: true});
    }
}


export default { validateOrCrash, createRandomNewCardsToUser, pasteAll, paste };