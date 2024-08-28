import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import measureServices from "services/measureServices";

export async function uploadMeasure(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("teste");
  try {
    const data = req.body;

    await measureServices.uploadMeasure(data);

    res.status(httpStatus.CREATED).send({
      success: true,
    });
  } catch (error) {
    return res.status(httpStatus.CONFLICT);
  }
}
