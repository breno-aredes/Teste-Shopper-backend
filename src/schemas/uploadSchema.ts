import Joi from "joi";
import { uploadType } from "protocols/upload";

export const uploadSchema = Joi.object<uploadType>({
  image: Joi.string().base64().required(),
  customer_code: Joi.string().required(),
  measure_datetime: Joi.date().required(),
  measure_type: Joi.string().valid("WATER", "GAS").required(),
});
