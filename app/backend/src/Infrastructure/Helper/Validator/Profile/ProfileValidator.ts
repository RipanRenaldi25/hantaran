import Joi from 'joi';
import { InvariantError } from '../../../../Domain/Exception/InvariantError';

const createProfileSchema = Joi.object({
  fullName: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  'address.city': Joi.string().required(),
  'address.postalCode': Joi.string().required(),
  'address.street': Joi.string().required(),
  'address.details': Joi.string(),
});

export const validateCreateProfilePayload = (payload: any) => {
  const result = createProfileSchema.validate(payload);
  if (result.error) {
    throw new InvariantError(result.error.message);
  }
  return result.value;
};
