import Joi, { required } from 'joi';

const email = Joi.string().email();
const password = Joi.string().min(6).max(20);
const userName = Joi.string().min(3).max(200);

export const dataFilterToC = {
  schema: Joi.object({
    email: email.required(),
    password: password.required(),
    userName: userName.required(),
  }),
  property: 'body',
};

export const dataFilterToU = {
  schema: Joi.object({
    email,
    password,
    userName,
    nickName: userName,
  }),
  property: 'body',
};

export const dataFilterLogin = {
  schema: Joi.object({
    email: email.required(),
    password: Joi.string().max(20).required(),
  }),
};
