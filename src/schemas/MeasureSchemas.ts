import Joi from "joi";
import { attMeasure, uploadType } from "../protocols/measure";

const isBase64 = (value: string) => {
  const base64Regex = /^[A-Za-z0-9+/]+[=]{0,2}$/;
  return base64Regex.test(value);
};

export const uploadSchema = Joi.object<uploadType>({
  image: Joi.string()
    .replace(/\s/g, "")
    .replace(/^data:image\/\w+;base64,/, "")
    .custom((value, helpers) => {
      if (!isBase64(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required(),
  customer_code: Joi.string().required(),
  measure_datetime: Joi.date().required(),
  measure_type: Joi.string().valid("WATER", "GAS").required(),
});

export const attMeasureSchema = Joi.object<attMeasure>({
  measure_uuid: Joi.string().required(),
  confirmed_value: Joi.number().required(),
});
