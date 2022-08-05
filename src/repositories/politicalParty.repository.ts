import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.politicalParty;

export type CreateInput = pkg.Prisma.PoliticalPartyCreateInput
export type UpdateInput = pkg.Prisma.PoliticalPartyUpdateInput



async function create (politicalParty: CreateInput) {
    return db.create({data: politicalParty});
}

async function get (id: number) {
    return db.findFirst({where: {id}});
}

async function update (id: number, politicalParty: UpdateInput) {
    return db.update({where: {id}, data: politicalParty});
}

export default {
    create,
    get,
    update
}