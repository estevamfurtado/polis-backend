import { Router } from "express";
import mw from "../middlewares/index.js";
import ct from "../controllers/index.js";
import joi from "../schemas/index.js";

const router = Router();

router.get("/",
    mw.help.logRoute("Get ranking"),
    mw.auth.validateToken,
    ct.ranking.getRanking
);

router.get("/:politicianId",
    mw.help.logRoute("Get politician"),
    mw.auth.validateToken,
    ct.ranking.getPolitician
);

export default router;
