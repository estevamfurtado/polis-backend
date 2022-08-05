import { Router } from "express";
import mw from "../middlewares/index.js";
import ct from "../controllers/index.js";
import joi from "../schemas/index.js";

const router = Router();

router.get("/video",
    mw.help.logRoute("Get tinder video"),
    mw.auth.validateToken,
    ct.tinder.getTinderVideo
);

router.post("/video",
    mw.help.logRoute("Post tinder video"),
    mw.auth.validateToken,
    mw.set.localsFromRequestData,
    mw.validate.joiSchema( joi.tinder.postVideo ),
    ct.tinder.postTinderVideo
);

router.post("/react/:videoId",
    mw.help.logRoute("Post tinder react"),
    mw.auth.validateToken,
    mw.set.localsFromRequestData,
    mw.validate.joiSchema( joi.tinder.react ),
    ct.tinder.putTinderReact
);

export default router;
