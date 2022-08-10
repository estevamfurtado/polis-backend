import { Request, Response } from "express";
import services from "../services/index.js";
import { arrayToObject } from "../utils/arrayToObject.js";

async function getRanking (req: Request, res: Response) {
    
    const politiciansArray = await services.politician.getAll();
    const partiesArray = await services.party.getAll();
    const statesArray = await services.state.getAll();
    
    const ranking = await services.ranking.getLastRanking();
    const recordsArray = await services.record.getByRanking(ranking.id);
    const partyRecordsArray = await services.partyRecord.getByRanking(ranking.id);
    const cardModelArray = await services.cardModel.getByRanking(ranking.id);

    const politicians = arrayToObject(politiciansArray, "id");
    const records = arrayToObject(recordsArray, "id");
    const partiesByAbbreviation = arrayToObject(partiesArray, "abbreviation");
    const partiesById = arrayToObject(partiesArray, "id");
    const statesByAbbreviation = arrayToObject(statesArray, "abbreviation");
    const statesById = arrayToObject(statesArray, "id");
    const partyRecords = arrayToObject(partyRecordsArray, "id");
    const cardModels = arrayToObject(cardModelArray, "id");

    const sendData = {
        ranking,
        politicians,
        records,
        parties: {id: partiesById, abbreviation: partiesByAbbreviation},
        states: {id: statesById, abbreviation: statesByAbbreviation},
        partyRecords,
        cardModels,
    };

    res.send(sendData);
}

async function getPolitician (req: Request, res: Response) {
}

export default {
    getRanking, getPolitician
}