import { Request, Response } from "express";
import services from "../services/index.js";

async function getLastAlbum (req: Request, res: Response) {
    const album = services.album.getLastAlbumWithDetails();
    

    res.send(album);
}

export default {
    getLastAlbum
}