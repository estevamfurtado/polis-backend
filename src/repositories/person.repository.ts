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
        return null;
    }
}

async function getByUsername (username: string) {
    try {
        return await db.findFirst({where: {username}});
    } catch (e) {
        return null;
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
        return null;
    }
    return null;
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

async function getEncryptedPasswordByUsername (username: string) {
    try {
        return await db.findFirst({
            where: {
                username
            },
            select: {
                password: true
            }
        });
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function searchByEmail (incompleteEmail: string) {
    const max=5;
    const email = incompleteEmail.toLowerCase();
    const response = await db.findMany({
        where: {
            email: {contains: email},
            isActive: true
        },
        select: {
            username: true,
            email: true,
            name: true,
            id: true
        },
        orderBy: {name: 'asc'},
        take: max
    });
    return response;
}

async function searchByUsername (incompleteUsername: string) {
    const max=5;
    const email = incompleteUsername.toLowerCase();
    const response = await db.findMany({
        where: {
            isActive: true,
            OR: {
                username: {contains: incompleteUsername},
                email: {contains: incompleteUsername}
            }
        },
        select: {
            username: true,
            email: true,
            name: true,
            id: true
        },
        orderBy: {lastFreePackAt: 'asc'},
        take: max
    });
    return response;
}

export default {
    searchByEmail,
    searchByUsername,
    create: {
        many: createMany,
        one: create
    },
    get: {
        vanilla: {
            whereId: get,
            whereEmail: getByEmail,
            whereCpf: getByCpf,
            whereUsername: getByUsername
        },
        encryptedPasword: {
            whereEmail: getEncryptedPassword,
            whereUsername: getEncryptedPasswordByUsername,
        }
    },
    update: {
        whereId: update,
    },
}