import { Request, Response } from "express";
import services from "../services/index.js";
import loggerUtils from "../utils/logger.utils.js";


async function postExchangeRequest (req: Request, res: Response) {
    const {user: {id}, userId, offeredCards, requestedCards} = res.locals;
    await services.exchangeRequest.postOrCrash(id, userId, offeredCards, requestedCards);
    res.sendStatus(200);
}

async function getExchangeRequests (req: Request, res: Response) {
    const {user: {id}} = res.locals;
    const requests = await services.exchangeRequest.getPendingByUserIdOrCrash(id);
    res.send(requests);
}


async function acceptRequest (req: Request, res: Response) {
    loggerUtils.log('controller', 'Accepting Request');
    const {exchangeId, user: {id}} = res.locals;

    const exId = Number(exchangeId);

    await services.exchangeRequest.acceptRequest(exId, id);
    res.sendStatus(200);
}

async function cancelRequest (req: Request, res: Response) {
    const {exchangeId, user: {id}} = res.locals;

    const exId = Number(exchangeId);

    await services.exchangeRequest.cancelRequest(exId, id);
    res.sendStatus(200);
}

async function rejectRequest (req: Request, res: Response) {
    const {exchangeId, user: {id}} = res.locals;

    const exId = Number(exchangeId);

    await services.exchangeRequest.rejectRequest(exId, id);
    res.sendStatus(200);
}


export default {
    postExchangeRequest,
    getExchangeRequests,
    acceptRequest,
    cancelRequest,
    rejectRequest
}