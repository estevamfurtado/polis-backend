import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.state;

export type CreateInput = pkg.Prisma.StateCreateInput
export type UpdateInput = pkg.Prisma.StateUpdateInput



async function create (state: CreateInput) {
    return await db.create({data: state});
}

async function get (id: number) {
    return await db.findFirst({where: {id}});
}

async function update (id: number, state: UpdateInput) {
    return await db.update({where: {id}, data: state});
}

async function getByAbbreviation (abbreviation: string) {
    return await db.findFirst({where: {abbreviation}});
}

export default {
    create,
    get: {
        vanilla: {
            whereId: get,
            whereAbbreviation: getByAbbreviation
        }
    },
    update
}