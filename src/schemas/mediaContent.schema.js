import Joi from 'joi';

const id = Joi.number().integer().positive();
const title = Joi.string().max(100);
const description = Joi.string();
