import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import measureServices from "services/measureServices";

export async function getMeasureByCustomerId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { customer_code } = req.params;
  const { measure_type } = req.query;

  try {
    const response = await measureServices.getMeasureByCustomerId({
      customer_code,
      measure_type: measure_type ? String(measure_type) : undefined,
    });

    res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
}

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

export async function confirmMeasure(
  req: Request,
  res: Response,
  next: NextFunction
) {}
