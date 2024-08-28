import { uploadMeasure } from "controllers/measureControllers";
import { Router } from "express";
import { schemaValidate } from "middleware/schema.validate";
import { uploadSchema } from "schemas/uploadSchema";

const measureRouter = Router();

measureRouter.get("").post("", uploadMeasure).patch("");

export { measureRouter };
