import Joi from 'joi';
import { InvariantError } from '../../../../Domain/Exception/InvariantError';

const createOrderSchema = Joi.object({
  orderItems: Joi.array()
    .items(
      Joi.object({
        boxId: Joi.string().required(),
        quantity: Joi.number().min(1).required().default(1),
        price: Joi.number().min(0).required().default(0),
        name: Joi.string().required().default('box'),
      })
    )
    .required(),
  paymentMethod: Joi.string()
    .valid('bank_transfer', 'qris', 'echannel')
    .required(),
  acquirer: Joi.string().valid('gopay', 'airpay shopee').when('paymentMethod', {
    is: 'qris',
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  billInfo1: Joi.string().when('paymentMethod', {
    is: 'echannel',
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  billInfo2: Joi.string().when('paymentMethod', {
    is: 'echannel',
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  bankName: Joi.string()
    .valid('bca', 'bni', 'bri', 'permata')
    .when('paymentMethod', {
      is: 'bank_transfer',
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
  vaNumber: Joi.string().when('paymentMethod', {
    is: 'bank_transfer',
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
});

const validatePayload = (payload: any, schema: Joi.Schema) => {
  const { error } = schema.validate(payload);
  if (error) {
    throw new InvariantError(error.details[0].message);
  }
};

export const validateCreateOrderPayload = (payload: any) => {
  validatePayload(payload, createOrderSchema);
};
