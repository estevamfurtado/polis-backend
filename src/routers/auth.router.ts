import { Router } from "express";
import mw from "../middlewares/index.js";
import ct from "../controllers/index.js";
import joi from "../schemas/index.js";

const router = Router();

router.post ("/sign-in", 
    mw.help.logRoute('Sign-in'),
    mw.set.localsFromRequestData,
    mw.validate.joiSchema( joi.auth.signIn ),
    ct.auth.signIn,
);

router.post ("/sign-up", 
    mw.help.logRoute('Sign-up'),
    mw.set.localsFromRequestData,
    mw.validate.joiSchema( joi.auth.signUp ),
    ct.auth.signUp,
);

export default router;
