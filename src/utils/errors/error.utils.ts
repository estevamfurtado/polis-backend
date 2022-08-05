
type AppErrorTypes = "conflict" | "not_found" | "unauthorized" | "wrong_schema" | "internal";

export interface AppError {
  type: AppErrorTypes;
  message: string;
  code: number;
}

const errors = {
  "not_found": {type: "not_found", message: "Not found", code: 404},
  "unauthorized": {type: "unauthorized", message: "Unauthorized", code: 401},
  "wrong_schema": {type: "wrong_schema", message: "Wrong schema", code: 400},
  "conflict": {type: "conflict", message: "Conflict", code: 409},
  "internal": {type: "internal", message: "Internal server error", code: 500}
} as { [key in AppErrorTypes]: AppError };

export function errorTypeToStatusCode(type: AppErrorTypes) {
  return errors[type] ? errors[type].code : 500;
}

function any (code?: number, type?: string, message?: string): AppError {
  const error = errors[type ?? "internal"];
  return { type: error.type, message: message ?? error.message, code: code ?? error.code };
}

function returnErrorFromType (error: AppError, message: string): AppError {
  return { type: error.type, message: message, code: error.code };
}

export function isAppError(error: object): error is AppError {
  return (error as AppError).type !== undefined;
}

export default {
  any,
  conflict: (message: string) => {return returnErrorFromType(errors.conflict, message)},
  notFound: (message: string) => {return returnErrorFromType(errors.not_found, message)},
  unauthorized: (message: string) => {return returnErrorFromType(errors.unauthorized, message)},
  wrongSchema: (message: string) => {return returnErrorFromType(errors.wrong_schema, message)},
  internal: (message: string) => {return returnErrorFromType(errors.internal, message)},
  isAppError,
}