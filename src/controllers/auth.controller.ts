import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import services from "../services/index.js";
import loggerUtils from "../utils/logger.utils.js";

async function signIn (req: Request, res: Response) {
    loggerUtils.log('controller', 'Signing In');
    const { username, password } = req.body;
    const token = await services.auth.signIn({username, password});

    loggerUtils.log('return', 'Signed in');
    res.status(200).send({token});
}

async function signUp (req: Request, res: Response) {

    loggerUtils.log('controller', 'Signing Up');
    const referralId = Number(req.params.referralId) ?? undefined;
    await services.auth.signUp(req.body, referralId);
    loggerUtils.log('return', 'Signed up');
    res.sendStatus(201);
}

export default {
    signIn, signUp
}