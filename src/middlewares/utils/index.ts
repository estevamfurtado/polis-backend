import { NextFunction, Request, Response } from "express";
import logger from "../../utils/logger.utils.js";
import AppError from "../../utils/errors/error.utils.js";

export async function throwAppError (req: Request, res: Response, next: NextFunction) {
    throw AppError.internal("Test AppError in middleware");
}

export async function throwError (req: Request, res: Response, next: NextFunction) {
    throw new Error("Test error in middleware");
}

export function logRoute (message: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        logger.log('route', message);
        next();
    };
}

export function handleError(error: any, req: Request, res: Response, next: NextFunction) {
    console.log('error', error);
    const appError = AppError.any(error.code, error.type, error.message);
    return res.status(appError.code).send(appError);
}

export default {
    throwAppError,
    throwError,
    logRoute,
    handleError
}