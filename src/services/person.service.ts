import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';
import { crypt } from '../utils/crypt/index.js';

type Element = Prisma.Person;
type CreateInput = Prisma.Prisma.PersonCreateInput;
type UpdateInput = Prisma.Prisma.PersonUpdateInput;

const repo = repos.person;

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

export default { 
    validateOrCrash,
    createOrCrash,
    findByEmailOrCrash,
    validatePasswordOrCrash
};