import { NextFunction, Request, Response } from "express";

import services from "../services/index.js";
import loggerUtils from "../utils/logger.utils.js";
import AppError from "../utils/errors/error.utils.js";

async function validateToken (req: Request, res: Response, next: NextFunction) {
    loggerUtils.log('middleware', 'Validating token');

    const {authorization} = res.locals || undefined;
    if (!authorization) {
        throw AppError.unauthorized('No token provided');
    }
    const token = authorization.split(' ')[1];
    if (!token) {
        throw AppError.unauthorized('No token provided');
    }
    const user = services.auth.validateTokenOrCrash(token);
    res.locals.userId = user.id;

    next();
}

export {validateToken}