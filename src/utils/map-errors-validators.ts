import { ValidationError } from "joi";

export const mapErrorValidator = (error: ValidationError) => {
  return error.details.map(details => ({ key: details.context.key, message: details.message }));
}