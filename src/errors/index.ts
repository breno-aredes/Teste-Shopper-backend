import { ApplicationError } from "protocols/errors";

function conflictsError(message: string): ApplicationError {
  return {
    error_code: "DOUBLE_REPORT",
    error_description: message,
  };
}

function invalidError(message: string): ApplicationError {
  return {
    error_code: "INVALID_DATA",
    error_description: message,
  };
}

function invalidTypeError(message: string): ApplicationError {
  return {
    error_code: "INVALID_TYPE",
    error_description: message,
  };
}

function NotFoundError(message: string): ApplicationError {
  return {
    error_code: "MEASURES_NOT_FOUND",
    error_description: message,
  };
}

function conflictsDuplicateError(message: string): ApplicationError {
  return {
    error_code: "CONFIRMATION_DUPLICATE",
    error_description: message,
  };
}

export default {
  conflictsError,
  invalidError,
  invalidTypeError,
  NotFoundError,
  conflictsDuplicateError,
};
