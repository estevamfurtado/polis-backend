import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validateJoiSchemaFromObjectOrCrash } from "../utils/joi.utils.js";
import loggerUtils from "../utils/logger.utils.js";


export function joiSchema (joi: Joi.AnySchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        loggerUtils.log('middleware', 'Validating request data with joi schema');
        validateJoiSchemaFromObjectOrCrash(res.locals, joi);
        next();
    }
}

