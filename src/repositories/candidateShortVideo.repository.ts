import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.candidateShortVideo;

export type CreateInput = pkg.Prisma.CandidateShortVideoCreateInput
export type UpdateInput = pkg.Prisma.CandidateShortVideoUpdateInput



async function create (candidateShortVideo: CreateInput) {
    return await db.create({data: candidateShortVideo});
}

async function get (id: number) {
    return await db.findFirst({where: {id}});
}

async function update (id: number, candidateShortVideo: UpdateInput) {
    return await db.update({where: {id}, data: candidateShortVideo});
}

export default {
    create,
    get,
    update
}