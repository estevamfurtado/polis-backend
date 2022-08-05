import { NextFunction, Request, Response } from "express";
import loggerUtils from "../utils/logger.utils.js";


export function localsFromRequestData(req: Request, res: Response, next: NextFunction) {
    loggerUtils.log('middleware', 'Saving request data to locals');
    const locals = {...res.locals, ...req.body, ...req.query, ...req.params, ...req.headers};
    res.locals = locals;
    next();
}