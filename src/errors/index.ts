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

export default { conflictsError, invalidError };
