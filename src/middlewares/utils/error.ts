import { NextFunction, Request, Response } from "express";
import {
  AppError,
  errorTypeToStatusCode,
  isAppError,
} from "../../utils/errors/error.utils.js";
import loggerUtils from "../../utils/logger.utils.js";

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (isAppError(err)) {

    loggerUtils.log('error', `${err.code} ${err.type} - ${err.message}`)
    return res.status(errorTypeToStatusCode(err.type)).send(err.message);
  }

  return res.sendStatus(500);
}
