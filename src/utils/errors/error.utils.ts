
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

function conflict(message?: string): AppError {
  const error = errors.conflict;
  return { type: error.type, message: message ?? error.message, code: error.code };
}

function notFound(message?: string): AppError {
  const error = errors.not_found;
  return { type: error.type, message: message ?? error.message, code: error.code };
}

function unauthorized(message?: string): AppError {
  const error = errors.unauthorized;
  return { type: error.type, message: message ?? error.message, code: error.code };
}

function wrongSchema(message?: string): AppError {
  const error = errors.wrong_schema;
  return { type: error.type, message: message ?? error.message, code: error.code };
}

function internal(message?: string): AppError {
  const error = errors.internal;
  return { type: error.type, message: message ?? error.message, code: error.code };
}

function any (code?: number, type?: string, message?: string): AppError {
  const error = errors[type ?? "internal"];
  return { type: error.type, message: message ?? error.message, code: code ?? error.code };
}


export default {
  any,
  conflict,
  notFound,
  unauthorized,
  wrongSchema,
  internal
}