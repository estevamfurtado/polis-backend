import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.candidate;

export type CreateInput = pkg.Prisma.CandidateCreateInput
export type UpdateInput = pkg.Prisma.CandidateUpdateInput



async function create (candidate: CreateInput) {
    return await db.create({data: candidate});
}

async function get (id: number) {
    return await db.findFirst({where: {id}});
}

async function update (id: number, candidate: UpdateInput) {
    return await db.update({where: {id}, data: candidate});
}

export default {
    create,
    get,
    update
}