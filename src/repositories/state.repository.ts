import pkg from '@prisma/client';
import database from "../database.js";
import errorUtils from '../utils/errors/error.utils.js';

const db = database.prisma.state;

export type CreateInput = pkg.Prisma.StateCreateInput
export type UpdateInput = pkg.Prisma.StateUpdateInput



async function create (state: CreateInput) {
    try {
        return await db.create({data: state});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    } 
}

async function createMany (data: CreateInput[]) {
    try {
        return await db.createMany({data});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function get (id: number) {
    try {
        return await db.findFirst({where: {id}});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong id');
    }
}

async function update (id: number, state: UpdateInput) {
    try {
        return await db.update({where: {id}, data: state});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function getByAbbreviation (abbreviation: string) {
    try {
        return await db.findFirst({where: {abbreviation}});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong abbreviation');
    }
}

async function getAll () {
    try {
        return await db.findMany({
            include: {
                politicians: {select: {id: true}},
                records: {select: {id: true}},
            }
        });
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

export default {
    create,
    get: {
        vanilla: {
            whereId: get,
            whereAbbreviation: getByAbbreviation
        }
    },
    update,
    getAll,
    createMany,
}