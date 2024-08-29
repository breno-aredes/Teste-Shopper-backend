import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import measureServices from "services/measureServices";

export async function uploadMeasure(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body;

    const response = await measureServices.uploadMeasure(data);

    res.status(httpStatus.CREATED).send(response);
  } catch (error) {
    next(error);
  }
}
