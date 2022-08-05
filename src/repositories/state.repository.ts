import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.state;

export type CreateInput = pkg.Prisma.StateCreateInput
export type UpdateInput = pkg.Prisma.StateUpdateInput



async function create (state: CreateInput) {
    return db.create({data: state});
}

async function get (id: number) {
    return db.findFirst({where: {id}});
}

async function update (id: number, state: UpdateInput) {
    return db.update({where: {id}, data: state});
}

export default {
    create,
    get,
    update
}