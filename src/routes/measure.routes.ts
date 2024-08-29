import {
  getMeasureByCustomerId,
  uploadMeasure,
} from "controllers/measureControllers";
import { Router } from "express";
import { schemaValidate } from "middleware/schema.validate";
import { uploadSchema } from "schemas/uploadSchema";

const measureRouter = Router();

measureRouter
  .get("/:customer_code/list", getMeasureByCustomerId)
  .post("/upload", schemaValidate(uploadSchema), uploadMeasure)
  .patch("");

export { measureRouter };
