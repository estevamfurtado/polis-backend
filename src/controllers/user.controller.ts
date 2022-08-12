import { Request, Response } from "express";
import services from "../services/index.js";

async function putUser (req: Request, res: Response) {
}

async function getUser (req: Request, res: Response) {
    const userId = res.locals.user.id;
    const user = await services.person.get.byId.orCrash(userId);
    delete user.password;
    res.send(user);
}

async function getUsersByEmail (req: Request, res: Response) {

    const {email} = res.locals;
    const users = await services.person.search.byEmail(email);
    res.send(users);
}

async function putCandidateProfile (req: Request, res: Response) {
}

async function postCandidateProfile (req: Request, res: Response) {
}

async function getUserInvite (req: Request, res: Response) {
}


export default {
    putUser,
    getUser,
    putCandidateProfile,
    postCandidateProfile,
    getUserInvite,
    getUsersByEmail,
}