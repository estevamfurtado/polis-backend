import pkg from '@prisma/client';
import database from "../database.js";
import errorUtils from '../utils/errors/error.utils.js';
import loggerUtils from '../utils/logger.utils.js';

const db = database.prisma.person;

export type CreateInput = pkg.Prisma.PersonCreateInput
export type CreateManyInput = pkg.Prisma.PersonCreateManyInput
export type UpdateInput = pkg.Prisma.PersonUpdateInput




async function create (person: CreateInput) {
    try {
        const response = await db.create({data: person});
        return response;
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong person schema');
    }
}


async function createMany (data: CreateManyInput[]) {

    console.log('tentando criar');
    console.log({data});

    try {
        await db.createMany({data});
    } catch (e) {
        console.log(e);
        throw errorUtils.wrongSchema('Wrong person schema');
    }
}

async function get (id: number) {
    try {
        return await db.findFirst({where: {id}});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong id');
    }
}

async function getByEmail (email: string) {
    try {
        return await db.findFirst({where: {email}});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong email');
    }
}

async function getByCpf (cpf: string) {
    try {
        return await db.findFirst({where: {cpf}});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong cpf');
    }
}

async function update (id: number, person: UpdateInput) {
    try {
        return await db.update({where: {id}, data: person});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function getEncryptedPassword (email: string) {
    try {
        return await db.findFirst({
            where: {
                email
            },
            select: {
                password: true
            }
        });
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

export default {
    create: {
        many: createMany,
        one: create
    },
    get: {
        vanilla: {
            whereId: get,
            whereEmail: getByEmail,
            whereCpf: getByCpf
        },
        encryptedPasword: {
            whereEmail: getEncryptedPassword,
        }
    },
    update: {
        whereId: update,
    },
}