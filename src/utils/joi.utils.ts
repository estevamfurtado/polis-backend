import AppError from "./errors/error.utils.js";
import Joi from "joi";
import logger from "./logger.utils.js";


function validateJoiSchemaFromObjectOrCrash(object: any, joiSchema: Joi.AnySchema) {
    
    logger.log('service', 'Validating object joi schema');

    let values = {};
    const keys = Object.keys(joiSchema.describe().keys);
    keys.forEach(key => {
        const value = object[key] || undefined;
        values = { ...values, [key]: value };
    });

    const { error } = joiSchema.validate(values);
    if (error) {
        throw AppError.wrongSchema(error.message);
    }

    return values;
}

export {validateJoiSchemaFromObjectOrCrash}