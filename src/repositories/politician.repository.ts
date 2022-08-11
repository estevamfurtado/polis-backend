import pkg from '@prisma/client';
import database from "../database.js";
import errorUtils from '../utils/errors/error.utils.js';

const db = database.prisma.politician;

export type CreateInput = pkg.Prisma.PoliticianCreateInput
export type UpdateInput = pkg.Prisma.PoliticianUpdateInput



async function create (politician: CreateInput) {
    try {
        return await db.create({data: politician});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong politician schema');
    }
}

async function get (id: number) {
    try {
        return await db.findFirst({where: {id}});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong id');
    }
}

async function update (id: number, politician: UpdateInput) {
    try {
        return await db.update({where: {id}, data: politician});
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

async function getAll () {
    try {
        return await db.findMany({
            include: {
                records: {
                    select: {id: true},
                }
            }
        });
    } catch (e) {
        throw errorUtils.wrongSchema('Wrong schema');
    }
}

export default {
    create,
    get,
    update,
    getAll
}