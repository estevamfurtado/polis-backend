import { Request, Response } from "express";
import services from "../services/index.js";
import loggerUtils from "../utils/logger.utils.js";
import { arrayToObject } from "../utils/arrayToObject.js";



async function getDeck (req: Request, res: Response) {
    loggerUtils.log('controller', 'Getting deck');
    const deck = await services.person.actions.getDeck(res.locals.user.id);
    // console.log(deck);
    res.send(deck);
}

async function getOtherUserDeck (req: Request, res: Response) {
    loggerUtils.log('controller', 'Getting other user deck');
    const userId = Number(res.locals.personId);
    console.log(res.locals.id + ' > ' + userId);
    const deck = await services.person.actions.getDeck(userId);
    res.send(deck);
}

async function openAllDeckPacks (req: Request, res: Response) {
    loggerUtils.log('controller', 'Opening all deck packs');
    await services.person.actions.openPacks(res.locals.user.id);
    res.sendStatus(200);
}

async function openOneDeckPack (req: Request, res: Response) {
    loggerUtils.log('controller', 'Opening one deck pack');
    const userId = res.locals.user.id;
    console.log(userId);
    await services.person.actions.openPacks(userId, 1);
    res.sendStatus(200);
}

async function pasteAllCards (req: Request, res: Response) {
    await services.card.pasteAll(res.locals.user.id);
    res.sendStatus(200);
}

async function pasteCard (req: Request, res: Response) {
    loggerUtils.log('controller', 'Pasting card');
    const cardId = Number(res.locals.cardId);
    const ownerId = res.locals.user.id;

    const card = await services.card.validateOwnership(cardId, ownerId);
    await services.card.pasteOrCrash(card);
    res.sendStatus(200);
}

async function toggleMarkCard (req: Request, res: Response) {
    loggerUtils.log('controller', 'Toggling mark card');
    const cardId = Number(res.locals.cardId);
    const ownerId = res.locals.user.id;

    await services.card.toggleMark(cardId, ownerId);
    res.sendStatus(200);
}


export default {
    getDeck,
    getOtherUserDeck,
    openAllDeckPacks,
    openOneDeckPack,
    pasteAllCards,
    pasteCard,
    toggleMarkCard
}