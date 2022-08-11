import { Request, Response } from "express";
import services from "../services/index.js";
import { arrayToObject } from "../utils/arrayToObject.js";

async function getLastAlbum (req: Request, res: Response) {
    
    const album = await services.album.getCompleteLastAlbum();

    res.send({album});
}

export default {
    getLastAlbum
}