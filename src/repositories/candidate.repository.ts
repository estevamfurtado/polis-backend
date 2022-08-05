import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.candidate;

export type CreateInput = pkg.Prisma.CandidateCreateInput
export type UpdateInput = pkg.Prisma.CandidateUpdateInput



async function create (candidate: CreateInput) {
    return db.create({data: candidate});
}

async function get (id: number) {
    return db.findFirst({where: {id}});
}

async function update (id: number, candidate: UpdateInput) {
    return db.update({where: {id}, data: candidate});
}

export default {
    create,
    get,
    update
}