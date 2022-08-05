import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.reaction;

export type CreateInput = pkg.Prisma.ReactionCreateInput
export type UpdateInput = pkg.Prisma.ReactionUpdateInput



async function create (reaction: CreateInput) {
    return db.create({data: reaction});
}

async function get (id: number) {
    return db.findFirst({where: {id}});
}

async function update (id: number, reaction: UpdateInput) {
    return db.update({where: {id}, data: reaction});
}

export default {
    create,
    get,
    update
}