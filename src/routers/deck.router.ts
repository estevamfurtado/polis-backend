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


router.post("/packs/realize",
    mw.help.logRoute("Realize packs"),
    mw.auth.validateToken,
    ct.deck.realizeNewPacks
);

// post deck/paste-all
router.post("/paste-all",
    mw.help.logRoute("Paste all cards"),
    mw.auth.validateToken,
    ct.deck.pasteAllCards
);

// post deck/paste/:cardId ok
router.post("/paste/:cardId",
    mw.help.logRoute("Paste card"),
    mw.auth.validateToken,
    mw.set.localsFromRequestData,
    ct.deck.pasteCard
);

// toggle mark card ok
router.put("/toggle-mark/:cardId",
    mw.help.logRoute("Toggle mark card"),
    mw.auth.validateToken,
    mw.set.localsFromRequestData,
    ct.deck.toggleMarkCard
);

// postExchangeRequest
router.post("/exchange/request",
    mw.help.logRoute("Post exchange request"),
    mw.auth.validateToken,
    mw.set.localsFromRequestData,
    ct.exchangeRequest.postExchangeRequest
);

// answerExchangeRequest
router.put("/exchange/:exchangeId/accept",
    mw.help.logRoute("Answer exchange request"),
    mw.auth.validateToken,
    mw.set.localsFromRequestData,
    ct.exchangeRequest.acceptRequest
);

router.put("/exchange/:exchangeId/reject",
    mw.help.logRoute("Answer exchange request"),
    mw.auth.validateToken,
    mw.set.localsFromRequestData,
    ct.exchangeRequest.rejectRequest
);

router.put("/exchange/:exchangeId/cancel",
    mw.help.logRoute("Answer exchange request"),
    mw.auth.validateToken,
    mw.set.localsFromRequestData,
    ct.exchangeRequest.cancelRequest
);

// getExchangeRequests
router.get("/exchange/requests",
    mw.help.logRoute("Get exchange requests"),
    mw.auth.validateToken,
    ct.exchangeRequest.getExchangeRequests
);

export default router;
