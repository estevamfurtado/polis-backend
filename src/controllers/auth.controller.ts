import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import services from "../services/index.js";

async function signIn (req: Request, res: Response) {
    const { email, password } = req.body;
    await services.auth.signIn(email, password);
    res.sendStatus(200);
}

async function signUp (req: Request, res: Response) {
    const referralId = req.headers.referralId ? Number(req.headers.referralId) : undefined;
    await services.auth.signUp(req.body as Prisma.PersonCreateInput, referralId);
    res.sendStatus(200);
}

export default {
    signIn, signUp
}