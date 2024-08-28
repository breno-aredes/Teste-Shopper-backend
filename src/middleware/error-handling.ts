import { Response, Request, NextFunction } from "express";
import httpStatus from "http-status";
import { ApplicationError } from "protocols/errors";

export function handlingError(
  err: ApplicationError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
