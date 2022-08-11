import { Request, Response } from "express";
import services from "../services/index.js";
import { arrayToObject } from "../utils/arrayToObject.js";

async function getRanking (req: Request, res: Response) {
    
    const politiciansArray = await services.politician.getAll();
    const partiesArray = await services.party.getAll();
    const statesArray = await services.state.getAll();
    
    const ranking = await services.ranking.getLastCompleteRanking();

    res.send({ranking});
}

async function getPolitician (req: Request, res: Response) {
}

export default {
    getRanking, getPolitician
}