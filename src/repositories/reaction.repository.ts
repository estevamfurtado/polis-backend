import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.reaction;

export type CreateInput = pkg.Prisma.ReactionCreateInput
export type UpdateInput = pkg.Prisma.ReactionUpdateInput



async function create (reaction: CreateInput) {
    return await db.create({data: reaction});
}

async function get (id: number) {
    return await db.findFirst({where: {id}});
}

async function update (id: number, reaction: UpdateInput) {
    return await db.update({where: {id}, data: reaction});
}

export default {
    create,
    get,
    update
}