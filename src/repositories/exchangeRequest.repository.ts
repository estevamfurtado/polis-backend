import pkg from '@prisma/client';
import database from "../database.js";
import errorUtils from '../utils/errors/error.utils.js';
import loggerUtils from '../utils/logger.utils.js';

const db = database.prisma.exchangeRequest;

export type CreateInput = pkg.Prisma.ExchangeRequestCreateInput
export type UpdateInput = pkg.Prisma.ExchangeRequestUpdateInput

function create (proposerId: number, requestedId: number, cardsOffered: number[], cardsRequested: number[]) {
    try {
        return db.create({
            data: {
                proposerId: proposerId,
                requestedId: requestedId,
                cardsOffered: {
                    connect: cardsOffered.map(cardId => ({ id: cardId }))
                },
                cardsRequested: {
                    connect: cardsRequested.map(cardId => ({ id: cardId }))
                }
            }
        });
    } catch (error) {
        loggerUtils.logObject('conflict', error);
        throw errorUtils.conflict('ExchangeRequest already exists');
    }
}

function answer (id: number, status: pkg.ExchangeStatus) {
    return db.update({
        where: { id: id },
        data: { status: status },
        include: {
            cardsOffered: true,
            cardsRequested: true,
        }
    });
}

function getPendingByUserId (userId: number) {
    return db.findMany({
        where: {
            OR: [
                { proposerId: userId },
                { requestedId: userId }
            ],
            status: 'pending'
        },
        include: {
            cardsOffered: {
                include: {
                    sticker: true
                }
            },
            cardsRequested:  {
                include: {
                    sticker: true
                }
            },
            proposer: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            requested: {
                select: {
                    id: true,
                    name: true,
                    email: true
                },
            }
        }
    });
}

async function getById (id: number) {
    try {
        console.log('trying')
        return await db.findUnique({
            where: { id: id }
        });
    } catch (error) {
        console.log('aquiiiii')
        loggerUtils.logObject('not found', error);
        throw errorUtils.notFound('ExchangeRequest not found');
    }
}

export default {
    create,
    answer,
    getPendingByUserId,
    getById
}