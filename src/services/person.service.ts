import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma, { Person } from '@prisma/client';
import { crypt } from '../utils/crypt/index.js';
import cardService from './card.service.js';

type Element = Prisma.Person;
type CreateInput = Prisma.Prisma.PersonCreateInput;
type UpdateInput = Prisma.Prisma.PersonUpdateInput;

const repo = repos.person;

const _PACK_SIZE = 5;

async function get (id: number) : Promise<Element> {
    const result = await repo.get(id);
    return result ?? null;
}

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`Person with id ${id} does not exist`);
    }
    return result;
}

async function createOrCrash (person: CreateInput) : Promise<Element> {
    const result = await repo.create(person);
    if (!result) {
        throw AppError.conflict('Person already exists');
    }
    return result;
}

async function findByEmailOrCrash (email: string) : Promise<Element> {
    const result = await repo.getByEmail(email);
    if (!result) {
        throw AppError.notFound(`Person with email ${email} does not exist`);
    }
    return result;
}

async function validatePasswordOrCrash (password: string, encryptedPassword: string) : Promise<void> {
    const isValid = crypt.bcrypt.compare(password, encryptedPassword);
    if (!isValid) {
        throw AppError.unauthorized('Invalid password');
    }
}

async function referredNewUser (referralId: number) : Promise<void> {
    const referral = await get(referralId);
    if (referral) {
        referral.packs += 1;
        await repo.update(referral.id, referral);
    }
}

async function openPacks (id: number, packs?: number) {
    const person = await validateOrCrash(id);
    if (person.packs > 0) {
        let amount = packs ? (person.packs > packs ? packs: person.packs) : person.packs;
        person.packs -= amount;
        await repo.update(person.id, person);
        await cardService.createRandomNewCards(person.id, amount*_PACK_SIZE);
    } else {
        throw AppError.conflict('You have no packs');
    }
}

export default { 
    validateOrCrash,
    createOrCrash,
    findByEmailOrCrash,
    validatePasswordOrCrash,
    referredNewUser
};