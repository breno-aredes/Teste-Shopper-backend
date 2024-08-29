import {
  confirmMeasure,
  getMeasureByCustomer,
  uploadMeasure,
} from "controllers/measureControllers";
import { Router } from "express";
import { schemaValidate } from "middleware/schema.validate";
import { attMeasureSchema, uploadSchema } from "schemas/MeasureSchemas";

const measureRouter = Router();

measureRouter
  .get("/:customer_code/list", getMeasureByCustomer)
  .post("/upload", schemaValidate(uploadSchema), uploadMeasure)
  .patch("/confirm", schemaValidate(attMeasureSchema), confirmMeasure);

export { measureRouter };
