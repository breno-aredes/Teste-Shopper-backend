import Joi from "joi";
import { attMeasure, uploadType } from "protocols/measure";

export const uploadSchema = Joi.object<uploadType>({
  image: Joi.string().base64().required(),
  customer_code: Joi.string().required(),
  measure_datetime: Joi.date().required(),
  measure_type: Joi.string().valid("WATER", "GAS").required(),
});

export const attMeasureSchema = Joi.object<attMeasure>({
  measure_uuid: Joi.string().required(),
  confirmed_value: Joi.number().required(),
});
