import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { ITodo } from '../types/todo';
import Logger from '../utils/Logger';

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      Logger.error(error);
      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  todo: {
    create: Joi.object<ITodo>({
      text: Joi.string().required()
    }),
    update: Joi.object<ITodo>({
      text: Joi.string().optional(),
      done: Joi.boolean().optional()
    })
  }
};
