import Joi, { string } from 'joi';
import { InvariantError } from '../../../../Domain/Exception/InvariantError';

const createProfileSchema = Joi.object({
  fullName: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  'address.city': Joi.string().required(),
  'address.postalCode': Joi.string().required(),
  'address.street': Joi.string().required(),
  'address.details': Joi.string(),
});

const updateProfileSchema = Joi.object({
  fullName: Joi.string().required(),
  phoneNumber: Joi.string().required(),
});

const validate = (payload: any, schema: Joi.Schema) => {
  const result = schema.validate(payload);
  if (result.error) {
    throw new InvariantError(result.error.message);
  }
};

export const validateCreateProfilePayload = (payload: any) => {
  validate(payload, createProfileSchema);
};

export const validateUpdateProfilePayload = (payload: any) => {
  validate(payload, updateProfileSchema);
};
