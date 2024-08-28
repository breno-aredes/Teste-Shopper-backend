function conflictsError(message: string) {
  return {
    error_code: "DOUBLE_REPORT",
    error_description: message,
  };
}

function invalidError(message: string) {
  return {
    error_code: "INVALID_DATA",
    error_description: message,
  };
}

export default { conflictsError, invalidError };
