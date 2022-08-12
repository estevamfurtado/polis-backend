import { Router } from "express";
import mw from "../middlewares/index.js";
import ct from "../controllers/index.js";
import joi from "../schemas/index.js";

const router = Router();

router.put("/",
    mw.help.logRoute("Put user"),
    mw.auth.validateToken,
    mw.set.localsFromRequestData,
    mw.validate.joiSchema( joi.user.putUser ),
    ct.user.putUser
);

router.get("/",
    mw.help.logRoute("Get user"),
    mw.auth.validateToken,
    ct.user.getUser
);

router.post("/candidate",
    mw.help.logRoute("Post user candidate"),
    mw.auth.validateToken,
    mw.set.localsFromRequestData,
    mw.validate.joiSchema( joi.user.postCandidate ),
    ct.user.postCandidateProfile
);

router.put("/candidate",
    mw.help.logRoute("Put user candidate"),
    mw.auth.validateToken,
    mw.set.localsFromRequestData,
    mw.validate.joiSchema( joi.user.putCandidate ),
    ct.user.putCandidateProfile
);

// get	/user/invite
router.get("/invite",
    mw.help.logRoute("Get user invite"),
    mw.auth.validateToken,
    ct.user.getUserInvite
);

router.get('/search/email/:email',
    mw.help.logRoute("Get users by email"),
    mw.auth.validateToken,
    mw.set.localsFromRequestData,
    ct.user.getUsersByEmail,
);

router.get('/deck/:personId',
    mw.help.logRoute("Get deck"),
    mw.auth.validateToken,
    mw.set.localsFromRequestData,
    ct.deck.getOtherUserDeck
);

export default router;
