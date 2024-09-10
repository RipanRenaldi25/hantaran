import joi from 'joi';
import { InvariantError } from '../../../../Domain/Exception/InvariantError';

const createBoxSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().min(0).required(),
});

const connectBoxSchema = joi.object({
  boxId: joi.string().required(),
  decorationId: joi.string().required(),
  colorId: joi.string().required(),
});

const updateBoxSchema = joi.object({
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
  const result = updateBoxSchema.validate(payload);
  if (result.error) {
    throw new InvariantError(result.error.message);
  }
  return result.value;
};

export const validateConnectBoxPayload = (payload: any) => {
  const result = connectBoxSchema.validate(payload);
  if (result.error) {
    throw new InvariantError(result.error.message);
  }
  return result.value;
};
