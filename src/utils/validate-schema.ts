import { ValidationError, Schema } from "joi";
import { Request, Response, NextFunction } from "express";

export const validateSchema = (schema: Schema, req: Request, res: Response, next: NextFunction) => {
  schema.validate(req.body, { abortEarly: false }, (err, value) => {
    if (!!err) res.status(400).json(mapErrorValidator(err));
    else next();
  });
}

const mapErrorValidator = (error: ValidationError) => {
  return error.details.map(details => ({ key: details.context.key, message: details.message }));
}