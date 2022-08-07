import { Request, Response } from "express";
import services from "../services/index.js";
import { arrayToObject } from "../utils/arrayToObject.js";

async function getLastAlbum (req: Request, res: Response) {
    const album = await services.album.getLastAlbum();

    const pagesArray = await services.page.getPagesByAlbum(album.id);
    const stickersArray = await services.sticker.getStickersByAlbum(album.id);

    const pages = arrayToObject(pagesArray, "id");
    const stickers = arrayToObject(stickersArray, "id");

    const sendData = {
        album,
        pages,
        stickers,
    };

    res.send(sendData);
}

export default {
    getLastAlbum
}