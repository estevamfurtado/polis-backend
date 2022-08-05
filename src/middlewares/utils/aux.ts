import { NextFunction, Request, Response } from "express";

import loggerUtils from "../../utils/logger.utils.js";
import AppError from "../../utils/errors/error.utils.js";

export async function throwAppError (req: Request, res: Response, next: NextFunction) {
    throw AppError.internal("Test AppError in middleware");
    throw new Error("Test AppError in middleware");
}

export async function throwError (req: Request, res: Response, next: NextFunction) {
    throw new Error("Test error in middleware");
}

export function logRoute (message: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        loggerUtils.log('route', message);
        next();
    };
}