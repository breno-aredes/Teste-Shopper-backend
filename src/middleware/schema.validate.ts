import { ObjectSchema, ValidationErrorItem } from "joi";
import { Request, Response, NextFunction } from "express";

export function schemaValidate(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errMessages = error.details.map(
        (err: ValidationErrorItem) => err.message
      );
      return res
        .status(400)
        .send({ error_code: "INVALID_DATA", error_description: errMessages });
    }
    next();
  };
}
