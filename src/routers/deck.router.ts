import { Router } from "express";
import mw from "../middlewares/index.js";
import ct from "../controllers/index.js";
import joi from "../schemas/index.js";

const router = Router();

// get deck
router.get("/",
    mw.help.logRoute("Get deck"),
    mw.auth.validateToken,
    ct.deck.getDeck
);

// post deck/packs/open-all
router.post("/packs/open-all",
    mw.help.logRoute("Open all deck packs"),
    mw.auth.validateToken,
    ct.deck.openAllDeckPacks
);

// post deck/packs/open-one
router.post("/packs/open-one",
    mw.help.logRoute("Open one deck pack"),
    mw.auth.validateToken,
    ct.deck.openOneDeckPack
);

// post deck/paste-all
router.post("/paste-all",
    mw.help.logRoute("Paste all cards"),
    mw.auth.validateToken,
    ct.deck.pasteAllCards
);

// post deck/paste/:cardId
router.post("/paste/:cardId",
    mw.help.logRoute("Paste card"),
    mw.auth.validateToken,
    mw.set.localsFromRequestData,
    ct.deck.pasteCard
);


export default router;
