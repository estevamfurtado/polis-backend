import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma, { Person } from '@prisma/client';
import { crypt } from '../utils/crypt/index.js';
import cardService from './card.service.js';
import loggerUtils from '../utils/logger.utils.js';

type Element = Prisma.Person;
type CreateInput = Prisma.Prisma.PersonCreateInput;
type UpdateInput = Prisma.Prisma.PersonUpdateInput;

const repo = repos.person;

const _PACK_SIZE = 5;

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
    const user = await repo.create(person);
    if (!user) {
        throw AppError.conflict('Person already exists');
    }
    return user;
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
        referral.packs += 1;
        await repo.update.whereId(referral.id, referral);
    }
}

async function openPacks (personId: number, packs?: number) {

    loggerUtils.log('service', 'Opening packs');

    const person = await validateOrCrash(personId);
    console.log(person.id)

    if (person.packs > 0) {
        let amount = packs ? (person.packs > packs ? packs: person.packs) : person.packs;
        console.log(`PACKS: ${person.packs} - ${amount} = ${person.packs - amount}`);
        person.packs -= amount;
        const cardsAmount = amount * _PACK_SIZE;
        console.log(`CARDS: ${cardsAmount} to ${person.id} (${personId})`);
        await cardService.createRandomNewCardsToUser(personId, cardsAmount);
        const updated = await repo.update.whereId(personId, person);
    } else {
        throw AppError.conflict('You have no packs');
    }
}

async function getDeck (userId: number) {
    loggerUtils.log('service', 'Getting deck');
    const person = await validateOrCrash(userId);
    console.log(person);
    const cards = await cardService.getAllCardsFromUser(userId);
    return {
        packs: person.packs,
        cards
    }
}

export default { 

    get: {
        byId: {
            only: get,
            orCrash: validateOrCrash
        },
        byEmail: {
            andCrash: findByEmailAndCrash,
            orCrash: findByEmailOrCrash
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
        orCrash: createOrCrash
    },
    actions: {
        referredNewUser,
        openPacks,
        getDeck
    }
};