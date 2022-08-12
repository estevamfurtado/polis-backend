// exchangeRequest

import { ExchangeStatus } from "@prisma/client"
import repositories from "../repositories/index.js"
import loggerUtils from "../utils/logger.utils.js"
import AppError from '../utils/errors/error.utils.js';
import cardService from './card.service.js';

async function answerOrCrash (id: number, status: ExchangeStatus) {
    try {
        return await repositories.exchangeRequest.answer(id, status)
    } catch (error) {
        loggerUtils.logObject('conflict', error);
        throw AppError.conflict('ExchangeRequest already exists');
    }
}

async function getPendingByUserIdOrCrash (userId: number) {
    try {
        return repositories.exchangeRequest.getPendingByUserId(userId)
    } catch (error) {
        loggerUtils.logObject('conflict', error);
        throw AppError.conflict('ExchangeRequest already exists');
    }
}

async function postOrCrash (proposerId: number, requestedId: number, cardsOffered: number[], cardsRequested: number[]) {
    try {
        return repositories.exchangeRequest.create(proposerId, requestedId, cardsOffered, cardsRequested)
    } catch (error) {
        loggerUtils.logObject('conflict', error);
        throw AppError.conflict('ExchangeRequest already exists');
    }
}

async function validateRequestProposerId (id: number, proposerId: number) {
    const request = await repositories.exchangeRequest.getById(id)
    if (request.proposerId !== proposerId) {
        throw AppError.forbidden('You are not the proposer of this request')
    }
}

async function validateRequestRequestedId (id: number, requestedId: number) {
    loggerUtils.log('service', `Validating requested id ${id}`);

    const request = await repositories.exchangeRequest.getById(id)

    loggerUtils.log('service', `... confronting ${requestedId} with ${request.requestedId}`);

    if (request.requestedId !== requestedId) {
        throw AppError.forbidden('You are not the requested of this request')
    }
}

async function acceptRequest (id: number, requestedId: number) {
    loggerUtils.log('service', 'Accepting Request');
    await validateRequestRequestedId(id, requestedId);

    loggerUtils.log('service', '... Saving answer');
    const request = await answerOrCrash(id, 'accepted');

    const { cardsOffered, cardsRequested, proposerId } = request;
    
    loggerUtils.log('service', '... Changing ownership');
    cardsOffered.forEach(async (card) => {
        await cardService.changeOwner(card.id, proposerId, requestedId);
    })

    cardsRequested.forEach(async (card) => {
        await cardService.changeOwner(card.id, proposerId, requestedId);
    })
}

async function rejectRequest (id: number, requestedId: number) {
    await validateRequestRequestedId(id, requestedId);
    await answerOrCrash(id, 'rejected');

}

async function cancelRequest (id: number, proposerId: number) {
    await validateRequestProposerId(id, proposerId);
    await answerOrCrash(id, 'canceled');
}




export default {
    answerOrCrash,
    getPendingByUserIdOrCrash,
    postOrCrash,
    acceptRequest,
    rejectRequest,
    cancelRequest
}