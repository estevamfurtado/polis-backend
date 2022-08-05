import { Router } from "express";
import mw from "../middlewares/index.js";
import ct from "../controllers/index.js";
import joi from "../schemas/index.js";

const router = Router();

// get ranking (last ranking)
router.get("/",
    mw.help.logRoute("Get ranking"),
    mw.auth.validateToken,
    ct.ranking.getRanking
);

// get ranking/:politicianId (data of politician)
router.get("/:politicianId",
    mw.help.logRoute("Get politician"),
    mw.auth.validateToken,
    ct.ranking.getPolitician
);

export default router;
