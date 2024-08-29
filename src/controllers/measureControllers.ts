import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import measureServices from "services/measureServices";

export async function getMeasureByCustomer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { customer_code } = req.params;
    let { measure_type } = req.query;

    measure_type = measure_type
      ? String(measure_type).toUpperCase()
      : undefined;

    const response = await measureServices.getMeasureByCustomer({
      customer_code,
      measure_type,
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
) {
  try {
    const data = req.body;

    await measureServices.confirmMeasure(data);

    res.status(httpStatus.OK).send({ sucess: true });
  } catch (error) {
    next(error);
  }
}
