import { Request, Response, NextFunction } from "express";
import Joi, { Schema } from 'joi';

import { validateSchema } from '@utils/validate-schema';

export const registerAndLoginEmailValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema: Schema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  });
  validateSchema(schema, req, res, next);
}