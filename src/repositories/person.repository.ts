import pkg from '@prisma/client';
import database from "../database.js";
import loggerUtils from '../utils/logger.utils.js';

const db = database.prisma.person;

export type CreateInput = pkg.Prisma.PersonCreateInput
export type UpdateInput = pkg.Prisma.PersonUpdateInput


async function create (person: CreateInput) {
    loggerUtils.log('repository', 'Creating person');
    const response = await db.create({data: person});
    return response;
}

async function get (id: number) {
    return await db.findFirst({where: {id}});
}

async function getByEmail (email: string) {
    return await db.findFirst({where: {email}});
}

async function getByCpf (cpf: string) {
    return await db.findFirst({where: {cpf}});
}

async function update (id: number, person: UpdateInput) {
    return await db.update({where: {id}, data: person});
}

async function getEncryptedPassword (email: string) {
    return await db.findFirst({
        where: {
            email
        },
        select: {
            password: true
        }
    });
}

export default {
    create,
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
    }
}