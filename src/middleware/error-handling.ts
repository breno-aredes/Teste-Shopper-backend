import { Response, Request, NextFunction } from "express";
import httpStatus from "http-status";
import { ApplicationError } from "protocols/errors";

export function handlingError(
  err: ApplicationError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err.error_code === "DOUBLE_REPORT") {
    return res.status(httpStatus.CONFLICT).send(err);
  }

  if (err.error_code === "INVALID_DATA" || "INVALID_TYPE") {
    return res.status(httpStatus.BAD_REQUEST).send(err);
  }

  if (err.error_code === "MEASURES_NOT_FOUND") {
    return res.status(httpStatus.NOT_FOUND).send(err);
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
