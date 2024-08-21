import joi from 'joi';
import { InvariantError } from '../../../../Domain/Exception/InvariantError';

const createBoxSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().min(0).required(),
});

export const validateCreateBoxPayload = (payload: any) => {
  const result = createBoxSchema.validate(payload);
  if (result.error) {
    throw new InvariantError(result.error.message);
  }
  return result.value;
};

export const validateUpdateBoxPayload = (payload: any) => {
  return validateCreateBoxPayload(payload);
};
