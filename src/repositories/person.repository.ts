import pkg from '@prisma/client';
import database from "../database.js";

const db = database.prisma.person;

export type CreateInput = pkg.Prisma.PersonCreateInput
export type UpdateInput = pkg.Prisma.PersonUpdateInput



async function create (person: CreateInput) {
    return db.create({data: person});
}

async function get (id: number) {
    return db.findFirst({where: {id}});
}

async function getByEmail (email: string) {
    return db.findFirst({where: {email}});
}

async function getByCpf (cpf: string) {
    return db.findFirst({where: {cpf}});
}

async function update (id: number, person: UpdateInput) {
    return db.update({where: {id}, data: person});
}

async function getEncryptedPassword (email: string) {
    return db.findFirst({
        where: {
            email
        },
        select: {
            password: true
        }
    });
}

export default {
    create,
    get,
    update,
    getEncryptedPassword,
    getByEmail
}