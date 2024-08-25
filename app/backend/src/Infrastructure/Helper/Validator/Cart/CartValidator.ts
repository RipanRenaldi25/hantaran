import Joi from 'joi';

const createCartSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      boxId: Joi.string().required(),
      quantity: Joi.number().min(1).required(),
    })
  ),
});

export const validateCreateCartPayload = (payload: any) => {
  const result = createCartSchema.validate(payload);
  if (result.error) {
    throw new Error(result.error.message);
  }
};
