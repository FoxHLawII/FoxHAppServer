import { Request, Response, NextFunction } from "express";
import Joi, { Schema } from 'joi';

import { mapErrorValidator } from '@utils/map-errors-validators';

export const registerEmailValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema: Schema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  });

  schema.validate(req.body, { abortEarly: false }, (err, value) => {
    if (!!err) res.status(400).json({errors: mapErrorValidator(err)});
    else next();
  })
}