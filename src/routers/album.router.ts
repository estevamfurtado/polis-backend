import { Router } from "express";
import mw from "../middlewares/index.js";
import ct from "../controllers/index.js";
import joi from "../schemas/index.js";

const router = Router();

router.get('/',
    mw.help.logRoute('Get last album'),
    ct.album.getLastAlbum
);

export default router;
