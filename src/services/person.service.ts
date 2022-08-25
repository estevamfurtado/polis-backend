import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma, { Person } from '@prisma/client';
import { crypt } from '../utils/crypt/index.js';
import cardService from './card.service.js';
import loggerUtils from '../utils/logger.utils.js';
import { arrayToObject } from '../utils/arrayToObject.js';
import variables from './variables.js';
import albumService from './album.service.js';
import pageService from './page.service.js';
import exchangeRequestService from './exchangeRequest.service.js';


type Element = Prisma.Person;
type CreateInput = Prisma.Prisma.PersonCreateInput;
type UpdateInput = Prisma.Prisma.PersonUpdateInput;

const repo = repos.person;

async function get (id: number) : Promise<Element> {
    const result = await repo.get.vanilla.whereId(id);
    return result ?? null;
}

async function validateOrCrash (id: number) : Promise<Element> {
    loggerUtils.log('service', 'Validating person or crash');
    const result = await repo.get.vanilla.whereId(id);
    if (!result) {
        throw AppError.notFound(`Person with id ${id} does not exist`);
    }
    return result;
}

async function createOrCrash (person: CreateInput) : Promise<Element> {
    loggerUtils.log('service', 'Creating person');
    const user = await repo.create.one(person);
    if (!user) {
        throw AppError.conflict('Person already exists');
    }
    return user;
}

async function findByUsernameAndCrash (username: string) {
    loggerUtils.log('service', 'Find person by email or crash');
    const result = await repo.get.vanilla.whereUsername(username);
    if (result) {
        throw AppError.conflict(`Person with username ${username} already exists`);
    }
}
async function findByUsernameOrCrash (username: string) : Promise<Element> {
    loggerUtils.log('service', 'Find person by username or crash');
    const result = await repo.get.vanilla.whereUsername(username);
    if (!result) {
        throw AppError.notFound(`Person with username ${username} does not exist`);
    }
    return result;
}

async function findByEmailAndCrash (email: string) {
    loggerUtils.log('service', 'Find person by email or crash');
    const result = await repo.get.vanilla.whereEmail(email);
    if (result) {
        throw AppError.conflict(`Person with email ${email} already exists`);
    }
}

async function findByCpfAndCrash (cpf: string) {
    const result = await repo.get.vanilla.whereCpf(cpf);
    if (result) {
        throw AppError.conflict(`Person with cpf ${cpf} already exists`);
    }
}

async function findByEmailOrCrash (email: string) : Promise<Element> {
    const result = await repo.get.vanilla.whereEmail(email);
    if (!result) {
        throw AppError.notFound(`Person with email ${email} does not exist`);
    }
    return result;
}

async function findByEmail (email: string) {
    const result = await repo.get.vanilla.whereEmail(email) ?? null;
    return result;
}

async function findByUsername (username: string) {
    const result = await repo.get.vanilla.whereUsername(username) ?? null;
    return result;
}

async function validatePasswordOrCrash (password: string, encryptedPassword: string) : Promise<void> {
    loggerUtils.log('service', 'Validating password or crash');
    const isValid = crypt.bcrypt.compare(password, encryptedPassword);
    if (!isValid) {
        throw AppError.unauthorized('Invalid password');
    }
}

async function referredNewUser (referralId: number) : Promise<void> {
    const referral = await get(referralId);
    if (referral) {
        referral.packs += variables.SIGN_IN_FREE_PACKS * 5;
        await repo.update.whereId(referral.id, referral);
    }
}

async function openPacks (personId: number, packs?: number) {

    loggerUtils.log('service', 'Opening packs');

    const person = await validateOrCrash(personId);

    if (person.packs > 0) {
        let amount = packs ? (person.packs > packs ? packs: person.packs) : person.packs;
        person.packs -= amount;
        const cardsAmount = amount * variables.CARDS_PER_PACK;
        await cardService.createRandomNewCardsToUser(personId, cardsAmount);
        const updated = await repo.update.whereId(personId, person);
    } else {
        throw AppError.conflict('You have no packs');
    }
}


async function getDeck (userId: number) {

    const {album, pages, stickers, stickersLine, pagesByParties, pagesByStates} = await albumService.getCompleteLastAlbum();
    
    const person = await validateOrCrash(userId);
    const packs = {
        new: person.packs,
        link: person.id,
        lastPackAt: person.lastFreePackAt.getTime(),
    }

    const cards = await cardService.getAllByOwner(userId);
    const processedStickers : ProcessedStickers = {};
    const processedCards : ProcessedCards = {
        cards: {},
        deck: {
            all: [],
            pasted: [],
            notPasted: {
                all: [],
                new: [],
                repeated: [],
                favorites: [],
                recent: []
            }
        }
    };

    process();

    const exchangeRequests = await exchangeRequestService.getPendingByUserIdOrCrash(userId);

    return {
        album,
        pages,
        stickers: processedStickers, 
        cards: processedCards,
        packs,
        exchangeRequests,
        pagesByParties, pagesByStates
    }

    function process() {
    
        stickersLine.forEach(s => {
            const sticker = stickers[s];
            if (sticker) {
                processedStickers[s] = {
                    ...sticker,
                    cards: {
                        all: [],
                        pasted: [],
                        notPasted: {
                            all: [],
                            new: [],
                            repeated: [],
                            favorites: [],
                            recent: []
                        }
                    }
                }
            }
        })

        cards.forEach(card => {

            processedCards.cards[card.id] = card;
            const sticker = processedStickers[card.stickerId] ?? null;

            const isPasted = card.isPasted;
            const isRecent = card.createdAt.getTime() > (new Date().getTime() - 1000*60*60);
            const isFavorite = !card.forExchange;

            processedCards.deck.all.push(card.id);
            if (sticker) {sticker.cards.all.push(card.id);}
            if (isPasted) {
                processedCards.deck.pasted.push(card.id);
                if (sticker) {sticker.cards.pasted.push(card.id);}
            } else {
                processedCards.deck.notPasted.all.push(card.id);
                if (sticker) {sticker.cards.notPasted.all.push(card.id);}

                if (isFavorite) {
                    processedCards.deck.notPasted.favorites.push(card.id);
                    if (sticker) {sticker.cards.notPasted.favorites.push(card.id);}
                }
                if (isRecent) {
                    processedCards.deck.notPasted.recent.push(card.id);
                    if (sticker) {sticker.cards.notPasted.recent.push(card.id);}
                }
            }
            
        })

        processedCards.deck.notPasted.all.forEach(id => {
            const sticker = processedStickers[processedCards.cards[id].stickerId] ?? null;
            if (sticker) {
                const isRepeated = sticker.cards.pasted.length > 0;
                if (isRepeated) {
                    processedCards.deck.notPasted.repeated.push(id);
                    if (sticker) {sticker.cards.notPasted.repeated.push(id);}
                }
                else {
                    processedCards.deck.notPasted.new.push(id);
                    if (sticker) {sticker.cards.notPasted.new.push(id);}
                }
            }
        })
    }
}


type ProcessedCards = {
    cards: {
        [key: number]: Prisma.Card
    },
    deck: {
        all: number[],
        pasted: number[],
        notPasted: {
            all: number[],
            new: number[],
            repeated: number[],
            favorites: number[],
            recent: number[],
        }
    }
}

type ProcessedStickers = {
    [key: number]: ProcessedSticker
}

type ProcessedSticker = Prisma.Sticker & {
    cards: {
        all: number[],
        pasted: number[],
        notPasted: {
            all: number[],
            new: number[],
            repeated: number[],
            favorites: number[],
            recent: number[],
        }
    }
}





async function createMany (people: CreateInput[]) {
    loggerUtils.log('service', 'Creating many people');
    await repo.create.many(people);
}

async function createManyPoliticians (people: CreateInput[]) {
    loggerUtils.log('service', 'Creating many politicians');
    for (const person of people) {
        await repo.create.one(person);
    }
}

async function signUpFreePacks (id: number) {
    await repo.update.whereId(id, {
        packs: variables.SIGN_UP_FREE_PACKS,
        lastPackAt: new Date(),
        lastFreePackAt: new Date()
    })
}

async function signInFreePacks (id: number) {
    const person = await validateOrCrash(id);
    const hasRight = person.lastFreePackAt && person.lastFreePackAt.getTime() + variables.SIGN_IN_FREE_CARDS_HOURS * 60 * 60 * 1000 < new Date().getTime();
    if (hasRight) {
        await repo.update.whereId(id, {
            packs: person.packs + variables.SIGN_IN_FREE_PACKS,
            lastPackAt: new Date(),
            lastFreePackAt: new Date()
        })
    }
}

async function searchByEmail (email: string) {
    loggerUtils.log('service', 'Searching by email');
    const result = await repo.searchByEmail(email);
    return result;
}

async function searchByUsername (username: string) {
    loggerUtils.log('service', 'Searching by username');
    const result = await repo.searchByUsername(username);
    return result;
}

async function update (id: number, data: Prisma.Prisma.PersonUpdateInput) {
    return await repo.update.whereId(id, data)
}


export default { 
    update: {
        byId: update,
    },
    search: { 
        byEmail: searchByEmail,
        byUsername: searchByUsername,
    },
    get: {
        byId: {
            only: get,
            orCrash: validateOrCrash
        },
        byEmail: {
            andCrash: findByEmailAndCrash,
            orCrash: findByEmailOrCrash,
            only: findByEmail,
        },
        byUsername: {
            andCrash: findByUsernameAndCrash,
            orCrash: findByUsernameOrCrash,
            only: findByUsername
        },
        byCpf: {
            andCrash: findByCpfAndCrash,
        }
    },
    validate: {
        password: {
            orCrash: validatePasswordOrCrash
        }
    },
    create: {
        orCrash: createOrCrash,
        many: createMany,
        manyEach: createManyPoliticians
    },
    actions: {
        referredNewUser,
        openPacks,
        getDeck,
        signUpFreePacks,
        signInFreePacks,
    }
};